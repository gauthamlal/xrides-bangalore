import React from "react";

const MAPBOX_DEFAULT_MAPSTYLES = [
  { label: "Streets V10", value: "mapbox://styles/mapbox/streets-v10" },
  { label: "Outdoors V10", value: "mapbox://styles/mapbox/outdoors-v10" },
  { label: "Light V9", value: "mapbox://styles/mapbox/light-v9" },
  { label: "Dark V9", value: "mapbox://styles/mapbox/dark-v9" },
  { label: "Satellite V9", value: "mapbox://styles/mapbox/satellite-v9" }
];

export const HEXAGON_CONTROLS = {
  showHexagon: {
    displayName: "Show Hexagon",
    type: "boolean",
    value: true
  },
  radius: {
    displayName: "Hexagon Radius",
    type: "range",
    value: 100,
    step: 50,
    min: 50,
    max: 1000
  },
  coverage: {
    displayName: "Hexagon Coverage",
    type: "range",
    value: 1,
    step: 0.1,
    min: 0,
    max: 1
  },
  upperPercentile: {
    displayName: "Hexagon Upper Percentile",
    type: "range",
    value: 100,
    step: 0.1,
    min: 80,
    max: 100
  },
  showScatterplot: {
    displayName: "Show Scatterplot",
    type: "boolean",
    value: true
  },
  radiusScale: {
    displayName: "Scatterplot Radius",
    type: "range",
    value: 5,
    step: 5,
    min: 1,
    max: 200
  }
};

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

export const LayerControls = props => {
  const _onValueChange = (settingName, newValue) => {
    const { settings } = props;
    // Only update if we have a confirmed change
    if (settings[settingName] !== newValue) {
      // Create a new object so that shallow-equal detects a change
      const newSettings = {
        ...props.settings,
        [settingName]: newValue
      };

      props.onChange(newSettings);
    }
  };

  const { title, settings, plotTypes = {} } = props;

  return (
    <div className="layer-controls">
      {title && <h4>{title}</h4>}
      {Object.keys(settings).map(key => (
        <div key={key}>
          <label>{plotTypes[key].displayName}</label>
          <div style={{ display: "inline-block", float: "right" }}>
            {settings[key]}
          </div>
          <Setting
            settingName={key}
            value={settings[key]}
            propType={plotTypes[key]}
            onChange={_onValueChange}
          />
        </div>
      ))}
    </div>
  );
};

const Setting = props => {
  const { propType } = props;
  if (propType && propType.type) {
    switch (propType.type) {
      case "range":
        return <Slider {...props} />;

      case "boolean":
        return <Checkbox {...props} />;
      default:
        return <input {...props} />;
    }
  }
};

const Checkbox = ({ settingName, value, onChange }) => {
  return (
    <div key={settingName}>
      <div className="input-group">
        <input
          type="checkbox"
          id={settingName}
          checked={value}
          onChange={e => onChange(settingName, e.target.checked)}
        />
      </div>
    </div>
  );
};

const Slider = ({ settingName, value, propType, onChange }) => {
  const { max = 100 } = propType;

  return (
    <div key={settingName}>
      <div className="input-group">
        <div>
          <input
            type="range"
            id={settingName}
            min={0}
            max={max}
            step={max / 100}
            value={value}
            onChange={e => onChange(settingName, Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
