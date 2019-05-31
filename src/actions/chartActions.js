import { CHART_HIGHLIGHT, CHART_SELECT, MODE_HIGHLIGHT } from "./types";

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

export const modeHighlight = mode => dispatch => {
  dispatch({
    type: MODE_HIGHLIGHT,
    payload: mode
  });
};
