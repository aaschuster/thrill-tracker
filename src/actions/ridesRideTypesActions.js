import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_RIDES_RIDE_TYPES = "GET_RIDES_RIDE_TYPES";
export const GET_RIDES_RIDE_TYPES_SUCCESS = "GET_RIDES_RIDE_TYPES_SUCCESS";
export const GET_RIDES_RIDE_TYPES_ERR = "GET_RIDES_RIDE_TYPES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RIDES_RIDE_TYPE = "ADD_RIDES_RIDE_TYPE";
export const DEL_RIDES_RIDE_TYPE = "ADD_RIDES_RIDE_TYPE";

export const getRidesRideTypes = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/ridesridetypes`)
        .then( ({data}) => {
            dispatch(getRidesRideTypesSuccess(data));
        })
        .catch( err => dispatch(getRidesRideTypesErr(err)));

    return {type: GET_RIDES_RIDE_TYPES};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getRidesRideTypesSuccess = ridesridetypes => {
    return {type: GET_RIDES_RIDE_TYPES_SUCCESS, payload: ridesridetypes};
}

const getRidesRideTypesErr = err => {
    return {type: GET_RIDES_RIDE_TYPES_ERR, payload: err.message};
}

export const addRidesRideType = ridesRideType => dispatch => {
    axios.post(`${serverURL}/ridesridetypes`, ridesRideType)
        .then( () => dispatch(getRidesRideTypes()))
        .catch( err => console.error(err));

    return {type: ADD_RIDES_RIDE_TYPE};
}

export const delRidesRideType = id => dispatch => {
    axios.delete(`${serverURL}/ridesridetypes/${id}`)
        .then( () => dispatch(getRidesRideTypes()))
        .catch( err => console.error(err));

    return {type: DEL_RIDES_RIDE_TYPE};
}