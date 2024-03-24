import CoolImage from '../../sharedStyles/CoolImage.png';
import React, { useState } from 'react';
import ReportPopup from '../../components/ReportPopup/ReportPopup'; {/* REMOVE THIS REPORT BUTTON, JUST FOR DEMO */}

const HomePageTemp = () => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  const handleReport = (reason, description) => {
    console.log('Report submitted with reason: ', reason, ' and description: ', description);
    // Here you would typically handle the report,
    // e.g., sending it to a server or an API endpoint.
  };

  return(
    <div>
      <div>
        TODO Add list/map/sightings view here!!
      </div>

      {/* REMOVE THIS REPORT BUTTON, JUST FOR DEMO */}
      <button onClick={() => setReportModalOpen(true)}>Report</button>
      {isReportModalOpen && (
        <ReportPopup
          onClose={() => setReportModalOpen(false)}
          onReport={handleReport}
        />
      )}

      <div>
        <img src={CoolImage} alt="Logo" style={{ width: '40%', height: 'auto' }} />
      </div>
    </div>
  )
}

export default HomePageTemp;