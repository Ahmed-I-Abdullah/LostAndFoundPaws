import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const CustomDropdown = ({ label, options, ...otherProps }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <Select
        label={label}
        {...otherProps}
        sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: '4px'
          }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomDropdown;
