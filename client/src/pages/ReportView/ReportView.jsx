import React, { useState, useEffect, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import ReportedPetCard from "../../components/ReportedPetCard/ReportedPetCard";
import ReportedCommentCard from "../../components/ReportedCommentCard/ReportedCommentCard";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from '../../graphql/mutations';
import { downloadData } from "@aws-amplify/storage";

const ReportView = ({ selectedType }) => {
    const client = useMemo(() => generateClient({ authMode: "userPool" }), []);
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                let fetchedReports = [];
    
                // Conditionally fetch reports based on selectedType
                if (selectedType.toLowerCase() === "comments") {
                    const data = await client.graphql({ query: queries.listCommentReports });
                    fetchedReports = data.data.listCommentReports.items.map(report => ({ ...report, entityType: 'comment' }));
                } else {
                    const data = await client.graphql({ query: queries.listPostReports });
                    fetchedReports = data.data.listPostReports.items.map(report => ({ ...report, entityType: 'post' }));
                }
    
                // Fetch additional details for posts or comments as needed
                const detailedReports = await Promise.all(fetchedReports.map(async (report) => {
                    if (report.entityType === 'post' && report.postID) {
                        const postData = await client.graphql({
                            query: queries.getPost,
                            variables: { id: report.postID },
                        });
                        const post = postData.data.getPost;
                        const firstImageUrl = post.images[0];
                        const firstImageData = await downloadData({ key: firstImageUrl }).result;
                        const firstImageSrc = URL.createObjectURL(firstImageData.body);
                        return { ...report, post: { ...post, firstImg: firstImageSrc } };
                    } else if (report.entityType === 'comment' && report.commentID) {
                        const commentData = await client.graphql({
                            query: queries.getComment,
                            variables: { id: report.commentID },
                        });
                        const comment = commentData.data.getComment;
                        if(comment == null) return { ...report, comment: null }
                        const detailedComment = {
                            ...comment,
                            username: comment.user?.username || "Deleted",
                            avatar: comment.user?.profilePicture || "",
                            userId: comment.user?.id,
                            replyTo : comment.replyTo
                        };
                        return { ...report, comment: detailedComment };
                    }
                    return report;
                }));
    
                // Filter reports based on selectedType for posts (ignore for comments since already filtered)
                const filteredReports = selectedType.toLowerCase() === "comments" ?
                    detailedReports :
                    detailedReports.filter(report => report.post && report.post.status.toLowerCase() === selectedType.toLowerCase());
    
                setReports(filteredReports);
            } catch (error) {
                console.error("Error fetching reports: ", error);
                setToastSeverity("error");
                setToastMessage("Error fetching reports.");
                setToastOpen(true);
            } finally {
                setLoading(false);
            }
        };
    
        fetchReports();
    }, [selectedType, client]);

    const handleDelete = async (reportId, entityId, entityType) => {
        setLoading(true);
        try {
            // Delete the entity (post or comment) associated with the report
            if (entityType === 'post') {
                await client.graphql({
                    query: mutations.deletePost,
                    variables: { input: { id: entityId } },
                });
            } else if (entityType === 'comment') {
                await client.graphql({
                    query: mutations.deleteComment,
                    variables: { input: { id: entityId } },
                });
            }
    
            // Delete the report itself
            const deleteReportMutation = entityType === 'post' ? mutations.deletePostReport : mutations.deleteCommentReport;
            await client.graphql({
                query: deleteReportMutation,
                variables: { input: { id: reportId } },
            });
    
            // Update the UI by removing the deleted report
            const updatedReports = reports.filter((report) => report.id !== reportId);
            setReports(updatedReports);
            handleToastOpen("success", `Report and associated ${entityType} deleted successfully`);
        } catch (error) {
            handleToastOpen("error", `Error deleting report and associated ${entityType}`);
            console.error(`Error deleting report and associated ${entityType}: `, error);
        }
        setLoading(false);
    };
    
    const handleIgnore = async (reportId, entityType) => {
        setLoading(true);
        try {
            // Delete the report only
            const deleteReportMutation = entityType === 'post' ? mutations.deletePostReport : mutations.deleteCommentReport;
            await client.graphql({
                query: deleteReportMutation,
                variables: { input: { id: reportId } },
            });
    
            // Update the UI by removing the ignored report
            const updatedReports = reports.filter((report) => report.id !== reportId);
            setReports(updatedReports);
            handleToastOpen("success", `Report ignored successfully`);
        } catch (error) {
            handleToastOpen("error", `Error ignoring report`);
            console.error(`Error ignoring report: `, error);
        }
        setLoading(false);
    };

    const handleToastOpen = (severity, message) => {
        setToastSeverity(severity);
        setToastMessage(message);
        setToastOpen(true);
    };

    const handleToastClose = (event, reason) => {
        setToastOpen(false);
    };


    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {reports.length > 0 ? reports.map((report) =>
                report.postID ? (
                    <ReportedPetCard
                        key={report.id}
                        report={report}
                        petData={report.post} 
                        onDelete={() => handleDelete(report.id, report.postID, 'post')}
                        onIgnore={() => handleIgnore(report.id, 'post')}
                    />
                ) : (
                    <ReportedCommentCard
                        key={report.id}
                        report={report}
                        commentData={report.comment} 
                        onDelete={() => handleDelete(report.id, report.commentID, 'comment')}
                        onIgnore={() => handleIgnore(report.id, 'comment')}
                    />
                )
            ) : <Box sx={{ textAlign: 'center' }}>No reports found for this category.</Box>}
            <ToastNotification
                open={toastOpen}
                severity={toastSeverity}
                message={toastMessage}
                handleClose={() => setToastOpen(false)}
            />
        </Box>
    );
};

export default ReportView;
