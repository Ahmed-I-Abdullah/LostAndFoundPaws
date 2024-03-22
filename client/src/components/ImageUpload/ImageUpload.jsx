import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./ImageUpload.css";

const ImageUpload = ({ images, handleImageChange, handleRemoveImage }) => {
  return (
    <div className="images-container">
      <div className="images-wrapper">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={URL.createObjectURL(image)}
              className="image-preview"
              alt={`Preview ${index}`}
            />
            <button
              className="delete-button"
              onClick={() => handleRemoveImage(index)}
            >
              <RemoveCircleIcon />
            </button>
          </div>
        ))}
      </div>
      <label
        htmlFor="file-upload"
        className="choose-files-button"
        style={images.length != 0 ? { marginLeft: "auto" } : {}}
      >
        Select Photo(s)
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple="multiple"
          onChange={handleImageChange}
          className="input-hidden"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
