import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_PARK_FAVORITES = "GET_PARK_FAVORITES";
export const GET_PARK_FAVORITES_SUCCESS = "GET_PARK_FAVORITES_SUCCESS";
export const GET_PARK_FAVORITES_ERR = "GET_PARK_FAVORITES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_PARK_FAVORITE = "ADD_PARK_FAVORITE";
export const DEL_PARK_FAVORITE = "DEL_PARK_FAVORITE";

export const getParkFavorites = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/userParkFavorites/${userID}`)
        .then( res => {
            dispatch(getParkFavoritesSuccess(res.data));
        })
        .catch( err => dispatch(getParkFavoritesErr(err)));

    return { type: GET_PARK_FAVORITES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getParkFavoritesSuccess = parkFavorites => {
    return {type: GET_PARK_FAVORITES_SUCCESS, payload: parkFavorites};
}

const getParkFavoritesErr = err => {
    return {type: GET_PARK_FAVORITES_ERR, payload: err.message};
}

export const addParkFavorite = parkFavorite => dispatch => {
    axios.post(`${serverURL}/userParkFavorites/`, parkFavorite)
        .then( () => dispatch(getParkFavorites(parkFavorite.users_id)))
        .catch( err => console.error(err));

    return {type: ADD_PARK_FAVORITE};
}

export const delParkFavorite = parkFavorite => dispatch => {
    axios.delete(`${serverURL}/userParkFavorites/${parkFavorite.user_park_favorites_id}`)
        .then( () => dispatch(getParkFavorites(parkFavorite.users_id)))
        .catch( err => console.error(err));
}