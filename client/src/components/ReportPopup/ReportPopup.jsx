import React, { useState } from 'react';
import './ReportPopup.css';
import Button from '@mui/material/Button';

function ReportPost({ onClose, onReport, contentType, itemId }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct a report object with all necessary information
    const reportDetails = {
      reason,
      description,
      contentType,
      itemId,     
    };

    // Send request to Amplify here
    onReport(reportDetails);
    onClose(); // Close the modal after reporting.
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
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          ></textarea>
          <div className="report-post-actions">
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button variant="contained" type="submit">Report</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportPost;
