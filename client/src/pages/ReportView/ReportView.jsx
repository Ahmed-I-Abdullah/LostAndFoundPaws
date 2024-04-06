import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import ReportedPetCard from "../../components/ReportedPetCard/ReportedPetCard";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from '../../graphql/mutations';
import { downloadData } from "@aws-amplify/storage";

const ReportView = ({ selectedType }) => {
  const client = generateClient({ authMode: "userPool" });
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchReportsAndPosts = async () => {
      try {
        const reportsData = await client.graphql({
          query: queries.listPostReports,
        });
        const fetchedReports = reportsData.data.listPostReports.items;

        // Fetch associated posts for each report
        const postsWithDetails = await Promise.all(fetchedReports.map(async (report) => {
          if (report.postID) {
            try {
              const postData = await client.graphql({
                query: queries.getPost, // Make sure you have a query to fetch individual posts by ID
                variables: { id: report.postID },
              });

              const post = postData.data.getPost;
              const firstImageUrl = post.images[0];
              const firstImageData = await downloadData({ key: firstImageUrl })
                .result;
              const firstImageSrc = URL.createObjectURL(firstImageData.body);

              post.firstImg = firstImageSrc;
              return { ...report, post: post };
            } catch (error) {
              console.error(`Error fetching post for report ${report.id}:`, error);
              return report; // Return report without post data in case of an error
            }
          }
          return report;
        }));

        // Apply the selectedType filter to the reports with their associated posts
        const filteredReports = selectedType !== "All" ?
          postsWithDetails.filter((report) => report.post && report.post.status.toLowerCase() === selectedType.toLowerCase()) :
          postsWithDetails;

        setReports(filteredReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports: ", error);
        setLoading(false);
        setToastSeverity("error");
        setToastMessage("Error fetching reports.");
        setToastOpen(true);
      }
    };

    fetchReportsAndPosts();
  }, [selectedType]);

  const handleDelete = async (reportId, postId) => {
    setLoading(true);
    try {
      // Delete the post associated with the report
      await client.graphql({
        query: mutations.deletePost,
        variables: { input: { id: postId } },
      });
      // Delete the report itself
      await client.graphql({
        query: mutations.deletePostReport,
        variables: { input: { id: reportId } },
      });
      // Update the UI by removing the deleted report
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      handleToastOpen("success", "Report and associated post deleted successfully");
    } catch (error) {
      handleToastOpen("error", "Error deleting report and associated post");
      console.error("Error deleting report and associated post: ", error);
    }
    setLoading(false);
  };

  const handleIgnore = async (reportId) => {
    setLoading(true);
    try {
      // Delete the report only
      await client.graphql({
        query: mutations.deletePostReport,
        variables: { input: { id: reportId } },
      });
      // Update the UI by removing the ignored report
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      handleToastOpen("success", "Report ignored successfully");
    } catch (error) {
      handleToastOpen("error", "Error ignoring report");
      console.error("Error ignoring report: ", error);
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
      {reports.length > 0 ? reports.map((report) => (
        <ReportedPetCard
          key={report.id}
          report={report}
          petData={report.post} // Assuming the report has a 'post' field with all necessary data
          onDelete={() => handleDelete(report.id, report.postID)}
          onIgnore={() => handleIgnore(report.id)}
        />
      )) : (
        <Box sx={{ textAlign: 'center' }}>No reports found for this category.</Box>
      )}
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </Box>
  );
};

export default ReportView;
