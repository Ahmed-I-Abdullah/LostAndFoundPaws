import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import FlagIcon from "@mui/icons-material/Flag";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import { useMobile } from "../../MobileContext";
import "./CommentCard.css";
import ReportPost from "../ReportPopup/ReportPopup";

const CommentCard = ({
  owner,
  id, //will be used when connected to backend
  avatar,
  username,
  createdAt,
  content,
  parentCommentId,
  parentCommentUsername,
  parentCommentContent,
  setReply,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [expandedComment, setExpandedComment] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const isMobile = useMobile();

  const handleEdit = (e) => {
    setEditedContent(e.target.value);
  };

  const handleReport = (reason, description) => {
    console.log(
      "Report submitted with reason: ",
      reason,
      " and description: ",
      description
    );
    //TODO: Implement Report Functionality
  };

  return (
    <Box
      className="posted-comment"
      style={{
        backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`,
        padding: 7,
      }}
    >
      <IconButton>
        <Avatar
          style={{
            width: isMobile ? "50px" : "100px",
            height: isMobile ? "50px" : "100px",
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
            <Typography color={`${theme.palette.primary.main}`}>
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
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: `${theme.palette.custom.primaryBkg}`,
            borderRadius: "1rem",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this comment?
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "80%",
              margin: "auto",
              gap: "1rem",
            }}
          >
            <Button variant="outlined" fullWidth onClick={handleCloseDelete}>
              No
            </Button>
            <Button variant="contained" fullWidth>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      {isReportModalOpen && (
        <ReportPost
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReport}
        />
      )}
    </Box>
  );
};

export default CommentCard;
