import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import { PersonOutline } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import FlagIcon from '@mui/icons-material/Flag';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import "./Comments.css"
import theme from "../../theme/theme";

const commentData = [
  {
    id: 1,
    content: "This is the first comment.",
    postID: 1,
    parentCommentID: null,
    userID: 1,
    userName: "John Doe",
    createdAt: "2024-03-23T08:00:00Z",
    updatedAt: "2024-03-23T08:00:00Z"
  },
  {
    id: 2,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at. Sed dapibus mauris nec ultricies feugiat. Maecenas auctor erat non eros finibus lobortis.",
    postID: 1,
    parentCommentID: null,
    userID: 2,
    userName: "Samantha Rose",
    createdAt: "2024-02-01T08:15:00Z",
    updatedAt: "2024-02-01T08:15:00Z"
  },
  {
    id: 3,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at",
    postID: 1,
    parentCommentID: 1,
    userID: 3,
    userName: "Joe Smith",
    createdAt: "2024-01-17T08:30:00Z",
    updatedAt: "2024-01-17T08:30:00Z"
  }
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Comments = () => {
  const [commentStates, setCommentStates] = useState(
    commentData.map(comment => ({ id: comment.id, showFullContent: false }))
  );
  const [commentreply, setCommentReply] = useState('');
  const [postCommentText, setPostCommentText] = useState('');
  const toggleContent = (id) => {
    setCommentStates(commentStates.map(state =>
      state.id === id ? { ...state, showFullContent: !state.showFullContent } : state
    ));
  };

  const setReply = (comment) => {
    if (comment === null){
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
      {commentData.length > 0 ? (
        commentData.map((comment, index) => (
          <div className="posted-comment" key={comment.id} style={{backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`}}>
            <IconButton>
              <Avatar className="avatar">
                <PersonOutline className="avatar" />
              </Avatar>
            </IconButton>
            <div className="comment-info">
              <div className="comment-topbar">
                <Typography variant="h5">
                  {comment.userName}
                </Typography>
                <Typography>
                  {formatDate(comment.createdAt)}
                </Typography>
              </div>
              <div className="comment-content" style={{color: `${theme.palette.custom.greyBkg.comment.content}`}}>
                {comment.parentCommentID && (() => {
                  const parentComment = commentData.find(parentComment => parentComment.id === comment.parentCommentID);
                  if (parentComment) {
                    const slicedContent = parentComment.content.slice(0, 100);
                    const displayContent = parentComment.content.length > 100 ? `${slicedContent}...` : slicedContent;
                    return (
                      <Typography color= {`${theme.palette.primary.main}`}>
                        {`@${parentComment.userName} ${displayContent}`}
                      </Typography>
                    );
                  }
                  return null;
                })()}
                <Typography>
                  {commentStates[index].showFullContent ? comment.content : comment.content.length > 150 ? comment.content.slice(0, 150) + '...' : comment.content}
                  {comment.content.length > 150 && (
                    <Button variant="text" sx={{color: `${theme.palette.text.primary}`}} onClick={() => toggleContent(comment.id)}>
                      {commentStates[index].showFullContent ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </Typography>
              </div>
              <div className="comment-actions">
                  {/** If the user that is logged in matches the comment.userId 
                   * or admin
                   * put edit/delete buttons instead
                   */}
                 <Button variant="text" sx={{color: `${theme.palette.text.primary}`}} onClick={() => setReply(comment)}>
                  <ReplyIcon />
                  Reply
                </Button>
                <Button variant="text" sx={{color: `${theme.palette.text.primary}`}}>
                  <FlagIcon />
                  Report
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments to show</p>
      )}
      <div className="post-comment" style={{backgroundColor: `${theme.palette.custom.greyBkg.comment.bkg}`}}>
        <div>
          {
            commentreply&&
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button variant="text">
                <HighlightOffIcon onClick={() => setReply(null)}/>
              </Button>
              <Typography variant="subtitle">
                Replying to {commentreply}
              </Typography>
            </Box>

          }
          <TextField
            id="outlined-multiline-static"
            multiline
            placeholder="Write your comment here"
            maxRows={3}
            sx={{
              width: "100%",
              margin: "1rem"
            }}
            value={postCommentText}
            onChange={handleChange}
          />
        </div>
        <Button 
          variant="contained"
          disabled={postCommentText.length===0}
          sx={{
            backgroundColor: `${theme.palette.primary.main}`,
            borderRadius: "1rem",
            color: `${theme.palette.custom.primaryBkg}`,
            minWidth: "fit-content"
          }}
        >
          Comment
        </Button>
      </div>
    </Grid>
  );
};

export default Comments;
