import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_MANUFACTURERS = "GET_MANUFACTURERS";
export const GET_MANUFACTURERS_SUCCESS = "GET_MANUFACTURERS_SUCCESS";
export const GET_MANUFACTURERS_ERR = "GET_MANUFACTURERS_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";

export const getManufacturers = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/manufacturers`)
        .then( res => {
            dispatch(getManufacturersSuccess(res.data));
        })
        .catch( err => dispatch(getManufacturersErr(err)));

        return {type: GET_MANUFACTURERS};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getManufacturersSuccess = manufacturers => {
    return {type: GET_MANUFACTURERS_SUCCESS, payload: manufacturers};
}

const getManufacturersErr = err => {
    return {type: GET_MANUFACTURERS_ERR, payload: err.message};
}