import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const SET_MESSAGE = "SET_MESSAGE";
export const SET_USER = "SET_USER";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_ERR = "SET_USER_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const CLEAR_USER = "CLEAR_USER";

export const setMessage = message => {
    return {type: SET_MESSAGE, payload: message};
}

export const setUser = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/users/current`, {headers: {credentials: "include"}})
        .then( res => {
            dispatch(setUserSuccess(res.data.user));
        })
        .catch( err => dispatch(setUserErr(err)));

    return {type: SET_USER, payload: userID}
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const setUserSuccess = user => {
    return {type: SET_USER_SUCCESS, payload: user};
}

const setUserErr = err => {
    return {type: SET_USER_ERR, payload: err.message};
}

export const clearUser = () => {
    return {type: CLEAR_USER};
}