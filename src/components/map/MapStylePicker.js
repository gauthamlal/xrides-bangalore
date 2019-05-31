import React from "react";

import { MAPBOX_DEFAULT_MAPSTYLES } from "../../util/map/controls";

const MapStylePicker = props => {
  const { style: currentStyle, changeMapStyle: onStyleChange } = props;
  // console.log(props);

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

export default MapStylePicker;
