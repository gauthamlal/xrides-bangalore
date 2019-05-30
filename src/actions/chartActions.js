import {
  CHART_HIGHLIGHT,
  CHART_SELECT,
  CHANGE_ACTIVE_CHART,
  MODE_HIGHLIGHT
} from "./types";

export const chartHighlight = hour => dispatch => {
  dispatch({
    type: CHART_HIGHLIGHT,
    payload: hour
  });
};

export const chartSelect = hour => dispatch => {
  dispatch({
    type: CHART_SELECT,
    payload: hour
  });
};

export const changeActiveChart = tab => dispatch => {
  // console.log(obj);

  dispatch({
    type: CHANGE_ACTIVE_CHART,
    payload: tab
  });
};

export const modeHighlight = mode => dispatch => {
  dispatch({
    type: MODE_HIGHLIGHT,
    payload: mode
  });
};
