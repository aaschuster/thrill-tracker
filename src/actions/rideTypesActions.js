import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_RIDE_TYPES = "GET_RIDE_TYPES";
export const GET_RIDE_TYPES_SUCCESS = "GET_RIDE_TYPES_SUCCESS";
export const GET_RIDE_TYPES_ERR = "GET_RIDE_TYPES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";

export const getRideTypes = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/ridetypes`)
        .then( ({data}) => {
            dispatch(getRideTypesSuccess(data));
        })
        .catch( err => dispatch(getRideTypesErr(err)));

    return {type: GET_RIDE_TYPES};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getRideTypesSuccess = rideTypes => {
    return {type: GET_RIDE_TYPES_SUCCESS, payload: rideTypes};
}

const getRideTypesErr = err => {
    return {type: GET_RIDE_TYPES_ERR, payload: err.message};
}
