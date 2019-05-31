import { FILE_UPLOAD, FILE_REMOVAL } from "./types";
import handleFileUpload from "../util/file/handleFileUpload";

export const uploadFile = file => dispatch => {
  handleFileUpload(file)
    .then(res => {
      const payload = {};
      payload.rideList = res.rideList;
      payload.isFileUploaded = true;
      payload.error = null;
      payload.fileName = file.name;
      dispatch({
        type: FILE_UPLOAD,
        payload
      });
    })
    .catch(err => {
      const payload = {};
      payload.rideList = [];
      payload.isFileUploaded = false;
      payload.fileError = true;
      // payload.fileName = file.name;
      dispatch({
        type: FILE_UPLOAD,
        payload
      });
    });
};

export const removeFile = () => dispatch => {
  dispatch({
    type: FILE_REMOVAL
  });
};
