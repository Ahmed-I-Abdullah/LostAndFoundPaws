import CoolImage from '../../sharedStyles/CoolImage.png';
import React, { useState } from 'react';
import ReportPopup from '../../components/ReportPopup/ReportPopup'; {/* REMOVE THIS REPORT BUTTON, JUST FOR DEMO */}
import theme from '../../theme/theme';
import { Box } from '@mui/material';
import Toggle from '../../components/Toggle/Toggle';
import ListView from '../ListView/ListView';

const postTypeOptions = [
  { label: "All", color: theme.palette.custom.selectedCategory.view },
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  { label: "Sighting", color: theme.palette.custom.selectedCategory.sighting }
];

const viewOptions = [
  { label: "List View", color: theme.palette.custom.selectedCategory.view },
  { label: "Map View", color: theme.palette.custom.selectedCategory.view }
];

const HomePageTemp = () => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  const handleReport = (reason, description) => {
    console.log('Report submitted with reason: ', reason, ' and description: ', description);
    // Here you would typically handle the report,
    // e.g., sending it to a server or an API endpoint.
  };
  const [selectedType, setSelectedType] = useState('All');
  const [selectedView, setSelectedView] = useState('List View');

  const handlePostTypeToggle = (index) => {
    setSelectedType(postTypeOptions[index].label);
  };
  const handleViewToggle = (index) => {
    setSelectedView(viewOptions[index].label);
  };

  return(
    <div>
     <Box>
        <Box display={'flex'} sx={{margin: '1rem', justifyContent: 'space-between'}}>
          <Toggle
            options={viewOptions}
            onToggleCallback={handleViewToggle}
            containerWidth={'20%'}
          />
          <Toggle
            options={postTypeOptions}
            onToggleCallback={handlePostTypeToggle}
            containerWidth={'40%'}
          />
        </Box>
        {
          selectedView === 'List View'?
            <ListView selectedType={selectedType}/>
          : <></> //Map View goes here
        }
      </Box>
    </div>
  )
}

export default HomePageTemp;