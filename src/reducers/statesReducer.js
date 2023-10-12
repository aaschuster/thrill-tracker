import {
    GET_STATES,
    GET_STATES_SUCCESS,
    GET_STATES_ERR,
    SET_FETCHING_TRUE
} from "../actions/statesActions";

const initState = {
    states: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_STATES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_STATES_SUCCESS:
            return {...state, isFetching: false, states: action.payload};
        case GET_STATES_ERR:
            return {...state, isFetching: false, error: action.payload};
        default:
            return state;
    }
}