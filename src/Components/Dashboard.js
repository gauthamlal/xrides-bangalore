import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csv";
import ReactMapGL from "react-map-gl";
// import { MapStylePicker } from "./controls";

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

  componentDidMount() {
    window.addEventListener("resize", this._resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

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
        let totalLat = 0;
        let totalLong = 0;
        let totalCount = 0;
        console.log(Number(rideList[0].from_lat));
        rideList.forEach(item => {
          // console.log(ite m.from_lat);
          if (item.from_lat) {
            // console.log(Number(item.from_lat));
            totalLat += Number(item.from_lat);
            totalLat = Math.round(totalLat * 100000) / 100000;
            console.log(totalLat);
            totalLong += Number(item.from_long);
            totalLat = Math.round(totalLat * 100000) / 100000;
            totalCount++;
          }
          if (item.to_lat) {
            totalLat += Number(item.to_lat);
            totalLong += Number(item.to_long);
            totalCount++;
          }
        });
        console.log(totalLat);
        const viewPortLat = totalLat / totalCount;
        const viewPortLong = totalLong / totalCount;
        console.log(viewPortLat, viewPortLong);
        this.setState({ rideList });
      });
    };
    reader.readAsBinaryString(file);
  };

  _onViewportChange = viewport => {
    this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  };

  _resize = () => {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Dropzone
          accept=".csv"
          onDrop={acceptedFiles => this.handleDrop(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="dropzone">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          mapStyle={this.state.style}
        />
      </div>
    );
  }
}
