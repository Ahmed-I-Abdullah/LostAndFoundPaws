import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({ name, InputProps, ...otherProps }) => {
  const mergedInputProps = {
    ...InputProps,
    style: {
      ...(InputProps ? InputProps.style : {}),
      backgroundColor: "#F5F5F5",
      color: "#979797",
      borderRadius: "10px",
    },
  };

  return (
    <TextField
      name={name}
      variant="outlined"
      className="textField"
      InputProps={mergedInputProps}
      {...otherProps}
    />
  );
};

export default CustomTextField;
