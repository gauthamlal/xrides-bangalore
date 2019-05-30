import { CHART_HIGHLIGHT, CHART_SELECT } from "./types";

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
