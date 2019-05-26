import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csv";
import ReactMapGL from "react-map-gl";

export default class Dashboard extends Component {
  state = {
    rideList: [],
    style: "mapbox://styles/mapbox/light-v9",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -74,
      latitude: 40.7,
      zoom: 11,
      maxZoom: 16
    }
  };

  handleDrop = files => {
    const file = files[0];
    let rideList = [];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        const headers = data.shift();
        // console.log(data);
        // console.log(headers);
        rideList = data.map(item => {
          const rideObject = {};
          item.forEach((rideInfo, i) => {
            rideObject[headers[i]] = rideInfo;
          });
          return rideObject;
        });
        this.setState({ rideList });
      });
    };
    reader.readAsBinaryString(file);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="dropzone">
          <Dropzone
            accept=".csv"
            onDrop={acceptedFiles => this.handleDrop(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapStyle={this.state.style}
        />
      </div>
    );
  }
}
