import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_CHAINS = "GET_CHAINS";
export const GET_CHAINS_SUCCESS = "GET_CHAINS_SUCCESS";
export const GET_CHAINS_ERR = "GET_CHAINS_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_CHAIN = "ADD_CHAIN";

export const getChains = () => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/chains/`)
        .then( res => {
            dispatch(getChainsSuccess(res.data));
        })
        .catch( err => dispatch(getChainsErr(err)));

    return {type: GET_CHAINS, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getChainsSuccess = chains => {
    return {type: GET_CHAINS_SUCCESS, payload: chains};
}

const getChainsErr = err => {
    return {type: GET_CHAINS_ERR, payload: err.message};
}

export const addChain = chain => dispatch => {
    axios.post(`${serverURL}/chains`, chain)
        .then( () => dispatch(getChains()))
        .catch( err => console.error(err));

    return {type: ADD_CHAIN};
}