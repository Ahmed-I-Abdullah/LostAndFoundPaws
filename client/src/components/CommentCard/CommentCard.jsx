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
import "./CommentCard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  setReply
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

  const handleEdit = (e) => {
    setEditedContent(e.target.value);
  };
  return (
    <Box
      className="posted-comment"
      style={{ backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`, padding: 7 }}
    >
      <IconButton>
        <Avatar className="avatar">
          <PersonOutline className="avatar" />
        </Avatar>
      </IconButton>
      <Box className="comment-info">
        <Box className="comment-topbar">
          <Typography variant="h8">{username}</Typography>
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
              id="outlined-multiline-static"
              multiline
              placeholder="Write your comment here"
              maxRows={3}
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
                ? content.slice(0, 150) + "..."
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
                    Cancel
                  </>
                ) : (
                  <>
                    <EditIcon />
                    Edit
                  </>
                )}
              </Button>
              {editing && (
                <Button
                  variant="text"
                  sx={{ color: `${theme.palette.text.primary}` }}
                >
                  <CheckIcon />
                  Save
                </Button>
              )}
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={handleOpenDelete}
              >
                <DeleteIcon />
                Delete
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
                Reply
              </Button>
              <Button
                variant="text"
                sx={{ color: `${theme.palette.text.primary}` }}
                size="small"
              >
                <FlagIcon />
                Report
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
    </Box>
  );
};

export default CommentCard;
