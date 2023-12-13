import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_RIDES = "GET_RIDES";
export const GET_RIDES_SUCCESS = "GET_RIDES_SUCCESS";
export const GET_RIDES_ERR = "GET_RIDES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RIDE = "ADD_RIDE";

export const getRides = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/rides`)
        .then( ({data}) => {
            dispatch(getRidesSuccess(data));
        })
        .catch( err => dispatch(getRidesErr(err)));

    return {type: GET_RIDES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getRidesSuccess = rides => {
    return {type: GET_RIDES_SUCCESS, payload: rides};
}

const getRidesErr = err => {
    return {type: GET_RIDES_ERR, payload: err.message};
}

export const addRide = ride => dispatch => {
    axios.post(`${serverURL}/rides`, ride)
        .then( () => dispatch(getRides()))
        .catch( err => console.error(err))

    return {type: ADD_RIDE};

}
