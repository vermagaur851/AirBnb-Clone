import React from "react";

function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      src={"http://localhost:3000/static/uploads" + place.photos[index]}
      alt="photos"
      className={className}
    />
  );
}

export default PlaceImg;
