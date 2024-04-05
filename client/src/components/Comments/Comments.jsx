import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./Comments.css";
import theme from "../../theme/theme";
import CommentCard from "../CommentCard/CommentCard";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import ToastNotification from "../ToastNotification/ToastNotificaiton";
import * as mutations from "../../graphql/mutations"
import { getCurrentUser } from "aws-amplify/auth"

const Comments = ( { postId} ) => {
  const client = generateClient({ authMode: "userPool" });

  const [commentReply, setCommentReply] = useState("");
  const [commentReplyId, setCommentReplyId] = useState("");
  const [postCommentText, setPostCommentText] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchPostComments = async () => {
    try {
      const commentResponse = await client.graphql({
        query: queries.commentsByPost,
        variables: { postID: postId}
      });
      const comments = commentResponse.data.commentsByPost.items;
      setCommentData(comments);
      setLoading(false);
    } catch (error) {
      handleToastOpen('error', 'Error fetching comments for the post');
      console.error('Error fetching comments for the post: ', error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  const findUsernameWithCommentId = (commentId) => {
    const comment = commentData.find((comment) => comment.id === commentId);
    return comment ? comment : null;
  };

  const setReply = (commentId) => {
    if (commentId === null) {
      setCommentReply("");
      setCommentReplyId("");
      return;
    }
    const comment = findUsernameWithCommentId(commentId);
    if (comment === null) {
      setCommentReply("");
      setCommentReplyId("");
      return;
    }
    setCommentReply(comment.user.username);
    setCommentReplyId(comment.id);
  };

  const handleChange = (e) => {
    setPostCommentText(e.target.value);
  };

  const postComment = async () => {
    try {
      //TODO:  remove and store the logged in user information globally
      const user = await getCurrentUser();

      const commentInput = {
        content: postCommentText,
        postID: postId,
        userID: user.userId,
        ...(commentReplyId && {parentCommentID: commentReplyId})
      }
      const newComment = await client.graphql({
        query: mutations.createComment,
        variables: { input: commentInput },
      });
      setPostCommentText("");
      const newCommentData = [newComment.data.createComment, ...commentData];
      setCommentData(newCommentData);
      handleToastOpen('success', 'comment successfully added');
    } catch (error) {
      handleToastOpen('error', 'Error posting comment for the post. Make sure you are logged in.');
      console.error('Error posting comment for the post: ', error);
    }
  }

  return (
    <Grid>
      <div style={{ maxHeight: "270px", overflowY: "scroll" }}>
        {commentData.length > 0 ? (
          commentData.map((comment, index) => (
            <CommentCard
              key={index}
              owner={false} //TODO: check if comment.userID matches the logged in user
              id={comment.id}
              content={comment.content}
              parentCommentId={comment.parentCommentID}
              username={comment.user.username}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
              setReply={setReply}
            />
          ))
        ) : (
          <p>No comments to show</p>
        )}
      </div>
      <div
        className="post-comment"
        style={{
          backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`,
        }}
      >
        <div className="post-comment-content">
          <div style={{ width: "80%" }}>
            {commentReply && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="text">
                  <HighlightOffIcon onClick={() => setReply(null)} />
                </Button>
                <Typography variant="subtitle">
                  Replying to {commentReply}
                </Typography>
              </Box>
            )}
            <TextField
              multiline
              placeholder="Write your comment here"
              rows={2}
              sx={{
                width: "100%",
              }}
              value={postCommentText}
              onChange={handleChange}
            />
          </div>
          <Button
            variant="contained"
            disabled={postCommentText.length === 0}
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              borderRadius: "1rem",
              color: `${theme.palette.custom.primaryBkg}`,
              minWidth: "fit-content",
            }}
            onClick={postComment}
          >
            <Typography>Comment</Typography>
          </Button>
        </div>
      </div>
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </Grid>
  );
};

export default Comments;
