export const MAPBOX_DEFAULT_MAPSTYLES = [
  { label: "Streets V10", value: "mapbox://styles/mapbox/streets-v10" },
  { label: "Outdoors V10", value: "mapbox://styles/mapbox/outdoors-v10" },
  { label: "Light V9", value: "mapbox://styles/mapbox/light-v9" },
  { label: "Dark V9", value: "mapbox://styles/mapbox/dark-v9" },
  { label: "Satellite V9", value: "mapbox://styles/mapbox/satellite-v9" }
];

export const HEXAGON_CONTROLS = {
  showHexagon: {
    name: "Show Hexagon",
    displayName: "Hexagon",
    type: "boolean",
    value: true,
    heading: true
  },
  radius: {
    name: "Hexagon Radius",
    displayName: "Radius",
    type: "range",
    value: 300,
    step: 50,
    min: 50,
    max: 1000,
    heading: false
  },
  coverage: {
    name: "Hexagon Coverage",
    displayName: "Coverage",
    type: "range",
    value: 1,
    step: 0.1,
    min: 0,
    max: 1,
    heading: false
  },
  upperPercentile: {
    name: "Hexagon Upper Percentile",
    displayName: "Upper Percentile",
    type: "range",
    value: 100,
    step: 0.1,
    min: 80,
    max: 100,
    heading: false
  },
  showScatterplot: {
    name: "Scatterplot",
    displayName: "Scatterplot",
    type: "boolean",
    value: true,
    heading: true
  },
  radiusScale: {
    name: "Scatterplot Radius",
    displayName: "Radius",
    type: "range",
    value: 20,
    step: 5,
    min: 1,
    max: 200,
    heading: false
  }
};
