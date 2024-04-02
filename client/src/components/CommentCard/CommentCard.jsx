import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  useMediaQuery
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import FlagIcon from "@mui/icons-material/Flag";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import { useMobile } from "../../context/MobileContext";
import "./CommentCard.css";
import ReportPost from "../ReportPopup/ReportPopup";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";

const CommentCard = ({
  owner,
  id, //will be used when connected to backend
  avatar,
  username,
  createdAt,
  content,
  parentCommentId,
  setReply,
}) => {
  const client = generateClient({ authMode: "userPool" });

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

  const handleEdit = (e) => {
    setEditedContent(e.target.value);
  };

  useEffect(() => {
    const fetchParentComment = async () => {
      try {
        const commentResponse = await client.graphql({
          query: queries.getComment,
          variables: { id: parentCommentId}
        });
        const parentComment = commentResponse.data.getComment;
        setParentCommentContent(parentComment.content);
        setParentCommentUsername(parentComment.user.username);
      } catch (error) {
        console.error('Error fetching comments for the post: ', error);
      }
    }
    if(parentCommentId) {
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

  const handleConfirmDelete = () => {
    //TODO: Implement Delete Backend Logic
    handleCloseDelete();
  }

  const handleConfirmSave = () => {
    //TODO: Implement Save Backend Logic
    handleCloseSave();
  }

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`,
        padding: "7px",
        width: "95%",
        margin: "1rem auto",
        gridTemplateColumns: small ? "30% 70%" : "10% 90%",
        borderRadius: "1rem",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
        display: "grid",
        gap: "1rem"
      }}
    >
      <IconButton>
        <Avatar
          style={{
            width: "50px",
            height: "50px" ,
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
          {parentCommentId && (
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
                ? content
                : content.length > 150
                ? content.slice(0, 75) + "..."
                : content}
              {content.length > 150 && (
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
                onClick={() => setEditing(!editing)}
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
    </Box>
  );
};

export default CommentCard;
