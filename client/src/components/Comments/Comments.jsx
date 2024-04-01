import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./Comments.css";
import theme from "../../theme/theme";
import CommentCard from "../CommentCard/CommentCard";

const commentData = [
  {
    id: 1,
    content: "This is the first comment.",
    postID: 1,
    parentCommentID: null,
    userID: 1,
    userName: "John Doe",
    createdAt: "2024-03-23T08:00:00Z",
    updatedAt: "2024-03-23T08:00:00Z",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at. Sed dapibus mauris nec ultricies feugiat. Maecenas auctor erat non eros finibus lobortis.",
    postID: 1,
    parentCommentID: null,
    userID: 2,
    userName: "Samantha Rose",
    createdAt: "2024-02-01T08:15:00Z",
    updatedAt: "2024-02-01T08:15:00Z",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at",
    postID: 1,
    parentCommentID: 1,
    userID: 3,
    userName: "Joe Smith",
    createdAt: "2024-01-17T08:30:00Z",
    updatedAt: "2024-01-17T08:30:00Z",
  },
];

const Comments = () => {
  const [commentreply, setCommentReply] = useState("");
  const [postCommentText, setPostCommentText] = useState("");

  const findUsernameWithCommentId = (commentId) => {
    const comment = commentData.find((comment) => comment.id === commentId);
    return comment ? comment : null;
  };

  const setReply = (commentId) => {
    if (commentId === null) {
      setCommentReply("");
      return;
    }
    const comment = findUsernameWithCommentId(commentId);
    console.log(comment);
    if (comment === null) {
      setCommentReply("");
      return;
    }
    setCommentReply(comment.userName);
  };

  const handleChange = (e) => {
    setPostCommentText(e.target.value);
  };

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
              parentCommentUsername={"hii"} //TODO: add parent username and content in shema
              parentCommentContent={"jii"}
              username={comment.userName}
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
            {commentreply && (
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
                  Replying to {commentreply}
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
          >
            <Typography>Comment</Typography>
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default Comments;
