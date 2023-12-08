import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_PARKS = "GET_PARKS";
export const GET_PARKS_SUCCESS = "GET_PARKS_SUCCESS";
export const GET_PARKS_ERR = "GET_PARKS_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_PARK = "ADD_PARK";
export const UPDATE_PARK = "UPDATE_PARK";

export const getParks = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/parks`)
        .then( ({data}) => {
            dispatch(getParksSuccess(data));
        })
        .catch( err => dispatch(getParksErr(err)));

    return {type: GET_PARKS, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getParksSuccess = parks => {
    return {type: GET_PARKS_SUCCESS, payload: parks};
}

const getParksErr = err => {
    return {type: GET_PARKS_ERR, payload: err.message};
}

export const addPark = park => dispatch => {
    axios.post(`${serverURL}/parks`, park) 
        .then( () => dispatch(getParks()))
        .catch( err => console.error(err));

    return {type: ADD_PARK};
}

export const updatePark = park => dispatch => {
    axios.put(`${serverURL}/parks/${park.parks_id}`, park)
        .then( () => dispatch(getParks()))
        .catch( err => console.error(err));

    return {type: UPDATE_PARK}
}