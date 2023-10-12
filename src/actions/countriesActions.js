import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_ERR = "GET_COUNTRIES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";

export const getCountries = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/countries/`)
        .then( res => {
            dispatch(getCountriesSuccess(res.data));
        })
        .catch( err => dispatch(getCountriesErr(err)));

    return {type: GET_COUNTRIES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getCountriesSuccess = countries => {
    return {type: GET_COUNTRIES_SUCCESS, payload: countries};
}

const getCountriesErr = err => {
    return {type: GET_COUNTRIES_ERR, payload: err.message};
}