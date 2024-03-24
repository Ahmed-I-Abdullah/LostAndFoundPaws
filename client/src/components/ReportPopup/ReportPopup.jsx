import React, { useState } from 'react';
import './ReportPopup.css';
import Button from '@mui/material/Button';

function ReportPost({ onClose, onReport }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send request to amplify here
    onReport(reason, description);
    onClose(); // close the modal after reporting.
  };

  return (
    <div className="report-post-overlay">
      <div className="report-post-modal">
        <form onSubmit={handleSubmit} className="report-post-form">
          <div className="report-post-header">
            <h2>Please select a reason for reporting this post</h2>
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
            <Button variant="contained" onClick={onClose} sx={{whiteSpace: 'nowrap'}}>Cancel</Button>
            <Button variant="outlined" type="submit" sx={{whiteSpace: 'nowrap'}}>Report</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportPost;