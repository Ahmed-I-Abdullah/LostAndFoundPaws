import React, { useState } from 'react';
import './ReportPopup.css';
import Button from '@mui/material/Button';
import { generateClient } from "aws-amplify/api"; // Assuming this is how you've been doing it
import * as mutations from '../../graphql/mutations';

function ReportEntity({ onClose, contentType, itemId, userId, onReport }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const client = generateClient({ authMode: "userPool" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    let mutation;
    let input = {
      reason: reason,
      description: description,
      userID: userId, 
    };

    if (contentType === "comment") {
      mutation = mutations.createCommentReport;
      input.commentID = itemId; 
    } else if (contentType === "post") {
      mutation = mutations.createPostReport;
      input.postID = itemId; 
    } else if (contentType === "sighting") {
      mutation = mutations.createSightingReport;
      input.sightingID = itemId; 
    }

    try {
      const { data } = await client.graphql({
        query: mutation,
        variables: { input },
      });
      console.log(`${contentType} report created: `, data);
      onClose(); 
      onReport();
      setIsSubmitting(false); 
    } catch (error) {
      console.error(`Error creating ${contentType} report:`, error);
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="report-post-overlay">
      <div className="report-post-modal">
        <form onSubmit={handleSubmit} className="report-post-form">
          <div className="report-post-header">
            <h3>Please select a reason for reporting this {contentType}</h3>
          </div>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="">Select a reason...</option>
            <option value="SPAM">Spam</option>
            <option value="INAPPROPRIATE">Inappropriate</option>
            <option value="OTHER">Other</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          ></textarea>
          <div className="report-post-actions">
            <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>Report</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportEntity;
