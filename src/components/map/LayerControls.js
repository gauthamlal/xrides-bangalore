import React from "react";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";

const LayerControls = props => {
  const handleValueChange = (settingName, newValue) => {
    const { settings } = props;
    if (settings[settingName] !== newValue) {
      const newSettings = {
        ...props.settings,
        [settingName]: newValue
      };

      props.handleLayerSettings(newSettings);
    }
  };

  const { showSettings, toggleSettings, settings, plotTypes = {} } = props;

  const jsx = showSettings ? (
    <div className="layer-controls" key="show">
      <div className="controls-toggle__holder">
        <i className="controls-toggle fas fa-times" onClick={toggleSettings} />
      </div>
      {Object.keys(settings).map(key => (
        <div
          key={key}
          style={
            plotTypes[key].heading
              ? {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }
              : {}
          }
        >
          <label
            style={
              plotTypes[key].heading
                ? { fontWeight: "bold", fontSize: "14px" }
                : {}
            }
          >
            {plotTypes[key].displayName}
          </label>
          <div style={{ display: "inline-block", float: "right" }}>
            {settings[key]}
          </div>
          <Setting
            settingName={key}
            value={settings[key]}
            plopType={plotTypes[key]}
            onChange={handleValueChange}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="layer-controls controls-toggle__holder" key="no-show">
      <i className="controls-toggle fas fa-cog" onClick={toggleSettings} />
    </div>
  );

  return jsx;
};

const Setting = props => {
  const { plopType } = props;
  if (plopType && plopType.type) {
    switch (plopType.type) {
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
        <SemanticCheckbox
          toggle
          id={settingName}
          checked={value}
          onChange={e => onChange(settingName, e.target.checked)}
        />
      </div>
    </div>
  );
};

const Slider = ({ settingName, value, plopType, onChange }) => {
  const { max = 100, min, step } = plopType;

  return (
    <div key={settingName}>
      <div className="input-group">
        <div>
          <input
            type="range"
            id={settingName}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(settingName, Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default LayerControls;
