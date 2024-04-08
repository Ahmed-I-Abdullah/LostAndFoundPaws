import React from "react";
import CustomTextField from "../TextField/TextField";
import MuiPhoneInput from "react-phone-input-material-ui";
import "react-phone-input-material-ui/lib/style.css";
import "./PhoneField.css";

const PhoneField = (props) => {
  return (
    <MuiPhoneInput
      value={props.value}
      onChange={(value, data, event, formattedValue) => {
        props.onChange(formattedValue);
      }}
      inputClass="phone-field-container"
      buttonStyle={{ marginLeft: 10 }}
      component={CustomTextField}
      country="ca"
      defaultConutry={"ca"}
      label=""
      autoFormat
      {...props}
    />
  );
};

export default PhoneField;
