import React from 'react'
import './PetCard.css'
import { Typography, Chip, Stack, Box, Button } from '@mui/material'
import theme from '../../theme/theme'
import DeleteIcon from '@mui/icons-material/Delete';

const PetCard = ( {
  owner,
  img,
  name,
  summary,
  status,
  petType,
  location,
  createdAt,
  updatedAt,
} ) => {
  const getStatusColor = () => {
    switch (status) {
      case 'LOST':
        return theme.palette.custom.selectedCategory.lost.dark;
      case 'FOUND':
        return theme.palette.custom.selectedCategory.found.dark;
      default:
        return ''; // Default color
    }
  };
  return (
    <Box className='pet-card'>
      <Box className='pet-img'>
        <img src={img}/>
      </Box>
      <Box className='pet-content'>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h2" fontWeight={'bold'} noWrap>
            {name}
          </Typography>
          {
            owner&&
            <Button 
              variant='contained'
              sx={{
                backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
                color: `${theme.palette.text.primary}`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}`
                },
              }}
            >
              <DeleteIcon />
              <Typography>Delete</Typography>
            </Button>
          }
        </Box>
        <Stack direction='row' spacing={0} sx={{ overflow: "auto", gap: 1, width: "90%", display: 'flex', flexWrap: 'wrap'}}>
          <Chip
            label={status}
            sx={{
              width: "fit-content",
              backgroundColor: getStatusColor()
            }}
          />
          <Chip
            label={petType}
            sx={{
              width: "fit-content",
            }}
          />
        </Stack>
        <Typography color={theme.palette.custom.greyBkg.comment.content}>
          {summary}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography fontWeight={'bold'}>
            {location}
          </Typography>
          <Typography color={theme.palette.custom.greyBkg.comment.content}>
            {`Posted: ${createdAt.split('T')[0]} - Updated: ${updatedAt.split('T')[0]}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PetCard