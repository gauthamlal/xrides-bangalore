export const MAPBOX_DEFAULT_MAPSTYLES = [
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
