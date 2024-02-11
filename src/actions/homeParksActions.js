import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_HOME_PARKS = "GET_HOME_PARKS";
export const GET_HOME_PARKS_SUCCESS = "GET_HOME_PARKS_SUCCESS";
export const GET_HOME_PARKS_ERR = "GET_HOME_PARKS_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_HOME_PARK = "ADD_HOME_PARK";
export const DEL_HOME_PARK = "DEL_HOME_PARK";

export const getHomeParks = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/userHomeParks/${userID}`)
        .then( res => {
            dispatch(getHomeParksSuccess(res.data));
        })
        .catch( err => dispatch(getHomeParksErr(err)));

    return { type: GET_HOME_PARKS, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getHomeParksSuccess = homeParks => {
    return {type: GET_HOME_PARKS_SUCCESS, payload: homeParks};
}

const getHomeParksErr = err => {
    return {type: GET_HOME_PARKS_ERR, payload: err.message};
}

export const addHomePark = homePark => dispatch => {
    axios.post(`${serverURL}/userHomeParks/`, homePark)
        .then( () => dispatch(getHomeParks(homePark.users_id)))
        .catch( err => console.error(err));

    return {type: ADD_HOME_PARK};
}

export const delHomePark = homePark => dispatch => {
    axios.delete(`${serverURL}/userHomeParks/${homePark.user_home_parks_id}`)
        .then( () => dispatch(getHomeParks(homePark.users_id)))
        .catch( err => console.error(err));
}