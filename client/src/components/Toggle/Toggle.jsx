import React, { useState, useEffect } from "react";
import "./Toggle.css";

const Toggle = ({ options, onToggleCallback, initialIndex = 0 }) => {
  const [selectedSwitch, setSelectedSwitch] = useState(initialIndex);
  const [labelWidth, setLabelWidth] = useState("auto");
  const [selectedColor, setSelectedColor] = useState(options[0].color);

  useEffect(() => {
    const width = `${100 / options.length}%`;
    setLabelWidth(width);
    setSelectedColor(options[selectedSwitch].color);
  }, [options, selectedSwitch]);

  const handleToggle = (index) => {
    setSelectedSwitch(index);
    setSelectedColor(options[index].color);
    onToggleCallback && onToggleCallback(index);
  };

  return (
    <div className="toggle-container">
      {options.map((item, index) => (
        <label
          key={index}
          className={`toggle-label ${
            selectedSwitch === index ? "selected" : ""
          }`}
          style={{ width: labelWidth }}
          onClick={() => handleToggle(index)}
        >
          <span style={{ marginRight: "10px" }}>{item.icon}</span>
          {item.label}
        </label>
      ))}
      <span
        className="toggle-handle"
        style={{
          left: `${selectedSwitch * (100 / options.length)}%`,
          width: labelWidth,
          backgroundColor: selectedColor,
        }}
      ></span>
    </div>
  );
};

export default Toggle;
