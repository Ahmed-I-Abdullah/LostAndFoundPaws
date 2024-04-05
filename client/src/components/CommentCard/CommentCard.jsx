import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import FlagIcon from "@mui/icons-material/Flag";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import "./CommentCard.css";
import ReportPost from "../ReportPopup/ReportPopup";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import ToastNotification from "../ToastNotification/ToastNotificaiton";

const CommentCard = ({
  owner,
  id, //will be used when connected to backend
  avatar,
  username,
  createdAt,
  content,
  parentCommentId,
  setReply,
  onDelete,
}) => {
  const client = generateClient({ authMode: "userPool" });
  const [commentContent, setCommentContent] = useState(content);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [expandedComment, setExpandedComment] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const [openSave, setOpenSave] = useState(false);
  const handleOpenSave = () => setOpenSave(true);
  const handleCloseSave = () => setOpenSave(false);

  const [parentCommentUsername, setParentCommentUsername] = useState("");
  const [parentCommentContent, setParentCommentContent] = useState("");

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    setToastOpen(false);
  };

  const handleEdit = (e) => {
    setEditedContent(e.target.value);
  };

  useEffect(() => {
    const fetchParentComment = async () => {
      try {
        const commentResponse = await client.graphql({
          query: queries.getComment,
          variables: { id: parentCommentId },
        });
        const parentComment = commentResponse.data.getComment;
        if (parentComment) {
          setParentCommentContent(parentComment.content);
          setParentCommentUsername(parentComment.user.username);
        }
      } catch (error) {
        console.log("Error fetching parent comment, parent comment might have been deleted: ", error);
      }
    };
    if (parentCommentId) {
      fetchParentComment();
    }
  }, []);

  const handleReport = (reason, description) => {
    console.log(
      "Report submitted with reason: ",
      reason,
      " and description: ",
      description
    );
    //TODO: Implement Report Functionality
  };
  const handleConfirmDelete = async () => {
    onDelete(id);
    handleCloseDelete();
  };

  const handleConfirmSave = async () => {
    const updateCommentInput = {
      id: id,
      content: editedContent,
    };
    try {
      const updatedComment = await client.graphql({
        query: mutations.updateComment,
        variables: { input: updateCommentInput },
      });
      handleToastOpen("success", "Successfully Updated comment");
      setCommentContent(updatedComment.data.updateComment.content);
      setEditedContent(updatedComment.data.updateComment.content);
    } catch (error) {
      handleToastOpen("error", "Error Updating comment");
      console.error("Error Updating comment: ", error);
    }
    setEditing(false);
    handleCloseSave();
  };

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`,
        padding: "7px",
        width: "95%",
        margin: "1rem auto",
        gridTemplateColumns: small ? "30% 70%" : "15% 85%",
        borderRadius: "1rem",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
        display: "grid",
        gap: "1rem",
      }}
    >
      <IconButton>
        <Avatar
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <PersonOutline />
        </Avatar>
      </IconButton>
      <Box className="comment-info">
        <Box className="comment-topbar">
          <Typography variant="h7">{username}</Typography>
          <Typography variant="caption">{formatDate(createdAt)}</Typography>
        </Box>
        <Box
          className="comment-content"
          style={{ color: `${theme.palette.custom.greyBkg.comment.content}` }}
        >
          {(parentCommentContent && parentCommentUsername) && (
            <Typography color={`${theme.palette.primary.main}`} noWrap>
              {`@${parentCommentUsername} ${parentCommentContent}`}
            </Typography>
          )}
          {editing ? (
            <TextField
              multiline
              placeholder="Write your comment here"
              rows={3}
              sx={{
                width: "100%",
                margin: "1rem",
              }}
              value={editedContent}
              onChange={handleEdit}
            />
          ) : (
            <Typography variant="subtitle2">
              {expandedComment
                ? commentContent
                : commentContent.length > 150
                ? commentContent.slice(0, 75) + "..."
                : commentContent}
              {commentContent.length > 150 && (
                <Button
                  variant="text"
                  sx={{ color: `${theme.palette.text.primary}` }}
                  onClick={() => setExpandedComment(!expandedComment)}
                  size="small"
                >
                  {expandedComment ? "Show less" : "Show more"}
                </Button>
              )}
            </Typography>
          )}
        </Box>
        <Box className="comment-actions">
          {owner ? (
            <>
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={() => {
                  setEditedContent(commentContent); // Reset editedContent to original content
                  setEditing(!editing);
                }}
                size="small"
              >
                {editing ? (
                  <>
                    <HighlightOffIcon />
                    <Typography variant="h9">Cancel</Typography>
                  </>
                ) : (
                  <>
                    <EditIcon />
                    <Typography variant="h9">Edit</Typography>
                  </>
                )}
              </Button>
              {editing && (
                <Button
                  variant="text"
                  sx={{ color: `${theme.palette.text.primary}` }}
                  onClick={handleOpenSave}
                >
                  <CheckIcon />
                  <Typography variant="h9">Save</Typography>
                </Button>
              )}
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={handleOpenDelete}
              >
                <DeleteIcon />
                <Typography variant="h9">Delete</Typography>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={() => setReply(id)}
                size="small"
              >
                <ReplyIcon />
                <Typography variant="h9">Reply</Typography>
              </Button>
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={() => setIsReportModalOpen(true)}
                size="small"
              >
                <FlagIcon />
                <Typography variant="h9">Report</Typography>
              </Button>
            </>
          )}
        </Box>
      </Box>
      <ConfirmDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this comment?"
      />
      <ConfirmDialog
        open={openSave}
        onClose={handleCloseSave}
        onConfirm={handleConfirmSave}
        title="Are you sure you want to save this comment change?"
      />
      {isReportModalOpen && (
        <ReportPost
          contentType="comment"
          itemId={"comment.id"}
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReport}
        />
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

export default CommentCard;
