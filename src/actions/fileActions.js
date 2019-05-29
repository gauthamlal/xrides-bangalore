import { FILE_UPLOAD, FILE_REMOVAL } from "./types";
import handleFileUpload from "../util/file/handleFileUpload";

export const uploadFile = file => dispatch => {
  handleFileUpload(file)
    .then(res => {
      const payload = {};
      payload.rideList = res.rideList;
      payload.isFileUploaded = true;
      dispatch({
        type: FILE_UPLOAD,
        payload
      });
    })
    .catch(err => {
      const payload = {};
      payload.rideList = [];
      payload.isFileUploaded = false;
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
