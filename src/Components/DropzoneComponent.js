import React from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";

import { uploadFile, removeFile } from "../actions/fileActions";

const _DropzoneComponent = props => {
  // console.log(props);

  const handleDrop = files => {
    const file = files[0];
    // DISPLAY FILE NAME
    // console.log(file.name);
    props.uploadFile(file);
  };

  const FileUploaded = (
    <div className="dropzone file-uploaded">
      <p>File has been uploaded successfully!</p>
      <p className="remove-file" onClick={props.removeFile}>
        X
      </p>
    </div>
  );

  const Drop = (
    <Dropzone accept=".csv" onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        // <section className="dropzone">
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Click to select your{" "}
            <span style={{ fontWeight: "bold" }}>.CSV</span> file
          </p>
        </div>
        // </section>
      )}
    </Dropzone>
  );

  return props.isFileUploaded ? FileUploaded : Drop;
};

const mapStateToProps = state => ({
  rideList: state.data.rideList,
  isFileUploaded: state.data.isFileUploaded
});

const DropzoneComponent = connect(
  mapStateToProps,
  {
    uploadFile,
    removeFile
  }
)(_DropzoneComponent);

export default DropzoneComponent;
