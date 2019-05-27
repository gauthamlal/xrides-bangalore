import React from "react";

const MAPBOX_DEFAULT_MAPSTYLES = [
  { label: "Streets V10", value: "mapbox://styles/mapbox/streets-v10" },
  { label: "Outdoors V10", value: "mapbox://styles/mapbox/outdoors-v10" },
  { label: "Light V9", value: "mapbox://styles/mapbox/light-v9" },
  { label: "Dark V9", value: "mapbox://styles/mapbox/dark-v9" },
  { label: "Satellite V9", value: "mapbox://styles/mapbox/satellite-v9" }
];

export const MapStylePicker = ({ currentStyle, onStyleChange }) => {
  return (
    <select
      className="map-style-picker"
      value={currentStyle}
      onChange={e => onStyleChange(e.target.value)}
    >
      {MAPBOX_DEFAULT_MAPSTYLES.map(styleItem => (
        <option key={styleItem.label} value={styleItem.value}>
          {styleItem.label}
        </option>
      ))}
    </select>
  );
};
