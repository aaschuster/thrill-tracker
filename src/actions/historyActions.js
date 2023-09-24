import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_HISTORY = "GET_HISTORY";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS";
export const GET_HISTORY_ERR = "GET_HISTORY_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RECORD = "ADD_RECORD";
export const DEL_RECORD = "DEL_RECORD";
export const UPDATE_RECORD = "UPDATE_RECORD";

export const getHistory = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/history/userid/${userID}`)
        .then( res => {
            dispatch(getHistorySuccess(res.data));
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

export const addRecord = record => dispatch => {   
    axios.post(`${serverURL}/history`, record)
        .then( () => dispatch(getHistory(record.users_id)))
        .catch( err => console.error(err));

    return {type: ADD_RECORD};
}

export const delRecord = (record) => dispatch => {
    axios.delete(`${serverURL}/history/${record.history_id}`)
        .then( () => dispatch(getHistory(record.users_id)));

    return {type: DEL_RECORD};
}

export const updateRecord = (record, id) => dispatch => {
    axios.put(`${serverURL}/history/${id}`, record)
        .then( () => dispatch(getHistory(record.users_id)))
        .catch(err => console.error(err));

    return {type: UPDATE_RECORD};
}