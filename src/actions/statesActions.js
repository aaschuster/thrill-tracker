import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_STATES = "GET_STATES";
export const GET_STATES_SUCCESS = "GET_STATES_SUCCESS";
export const GET_STATES_ERR = "GET_STATES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";

export const getStates = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/states/`)
        .then( res => {
            dispatch(getStatesSuccess(res.data));
        })
        .catch( err => dispatch(getStatesErr(err)));

    return {type: GET_STATES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getStatesSuccess = states => {
    return {type: GET_STATES_SUCCESS, payload: states};
}

const getStatesErr = err => {
    return {type: GET_STATES_ERR, payload: err.message};
}