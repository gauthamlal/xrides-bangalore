import { CHART_HIGHLIGHT, CHART_SELECT, CHANGE_ACTIVE_CHART } from "./types";

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

export const changeActiveChart = obj => dispatch => {
  console.log(obj);

  dispatch({
    type: CHANGE_ACTIVE_CHART,
    payload: obj
  });
};
