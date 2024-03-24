import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ name, ...otherProps }) => {
  return (
    <TextField
      name={name}
      variant="outlined"
      className="textField"
      InputProps={{
        style: { backgroundColor: '#F5F5F5', color: '#979797', borderRadius: '10px' }
      }}
      {...otherProps}
    />
  );
}

export default CustomTextField;
