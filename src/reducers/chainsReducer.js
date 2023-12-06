import {
    GET_CHAINS,
    GET_CHAINS_SUCCESS,
    GET_CHAINS_ERR,
    SET_FETCHING_TRUE,
    ADD_CHAIN
} from "../actions/chainsActions";

const initState = {
    chains: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_CHAINS:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_CHAINS_SUCCESS:
            return {...state, isFetching: false, chains: action.payload};
        case GET_CHAINS_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_CHAIN:
            return state;
        default:
            return state;
    }
}