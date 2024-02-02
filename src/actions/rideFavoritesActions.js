import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_RIDE_FAVORITES = "GET_RIDE_FAVORITES";
export const GET_RIDE_FAVORITES_SUCCESS = "GET_RIDE_FAVORITES_SUCCESS";
export const GET_RIDE_FAVORITES_ERR = "GET_RIDE_FAVORITES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RIDE_FAVORITE = "ADD_RIDE_FAVORITE";
export const DEL_RIDE_FAVORITE = "DEL_RIDE_FAVORITE";

export const getRideFavorites = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/userRideFavorites/`)
        .then( res => {
            dispatch(getRideFavoritesSuccess(res.data));
        })
        .catch( err => dispatch(getRideFavoritesErr(err)));

    return { type: GET_RIDE_FAVORITES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getRideFavoritesSuccess = rideFavorites => {
    return {type: GET_RIDE_FAVORITES_SUCCESS, payload: rideFavorites};
}

const getRideFavoritesErr = err => {
    return {type: GET_RIDE_FAVORITES_ERR, payload: err.message};
}

export const addRideFavorite = rideFavorite => dispatch => {
    axios.post(`${serverURL}/userRideFavorites/`, rideFavorite)
        .then( () => dispatch(getRideFavorites()))
        .catch( err => console.error(err));

    return {type: ADD_RIDE_FAVORITE};
}