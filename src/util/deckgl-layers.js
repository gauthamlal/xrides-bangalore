// import React from "react";
import { ScatterplotLayer } from "deck.gl";

export function renderLayers(props) {
  const { data, settings } = props;
  console.log(props);

  return [
    new ScatterplotLayer({
      id: "scatterplot",
      getPosition: d => d.position,
      getFillColor: d => (d.pickup ? [0, 102, 0] : [204, 0, 0]),
      getRadius: d => 5,
      opacity: 0.5,
      pickable: true,
      radiusMinPixels: 0.25,
      radiusMaxPixels: 30,
      data,
      ...settings,
      visible: settings.showScatterplot
    })
  ];
}
