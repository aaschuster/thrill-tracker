import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_HISTORY = "GET_HISTORY";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS";
export const GET_HISTORY_ERR = "GET_HISTORY_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RECORD = "ADD_RECORD";

export const getHistory = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/history`)
        .then( ({data}) => {
            dispatch(getHistorySuccess(data));
        })
        .catch( err => dispatch(getHistoryErr(err)));

    return {type: GET_HISTORY, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getHistorySuccess = history => {
    return {type: GET_HISTORY_SUCCESS, payload: history};
}

const getHistoryErr = err => {
    return {type: GET_HISTORY_ERR, payload: err.message};
}

export const addRecord = record => {
    axios.post(`${serverURL}/history`, record);

    return {type: ADD_RECORD, payload: record};
}