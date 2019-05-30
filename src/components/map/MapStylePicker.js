import React from "react";
import { connect } from "react-redux";

import { MAPBOX_DEFAULT_MAPSTYLES } from "../../util/map/controls";
import { changeMapStyle } from "../../actions/mapActions";

const _MapStylePicker = props => {
  const { style: currentStyle, changeMapStyle: onStyleChange } = props;
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

const mapStateToProps = state => ({
  style: state.map.style
});

const MapStylePicker = connect(
  mapStateToProps,
  { changeMapStyle }
)(_MapStylePicker);

export default MapStylePicker;
