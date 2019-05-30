import { UPDATE_LAYER_SETTINGS } from "./types";

export const updateLayerSettings = settings => dispatch => {
  dispatch({
    type: UPDATE_LAYER_SETTINGS,
    payload: settings
  });
};
