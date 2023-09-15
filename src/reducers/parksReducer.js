import {
    GET_PARKS,
    GET_PARKS_SUCCESS,
    GET_PARKS_ERR,
    SET_FETCHING_TRUE
} from "../actions/parksActions";

const initState = {
    parks: [],
    isFetching: false,
    error: ""
};

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_PARKS:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_PARKS_SUCCESS:
            return {...state, isFetching: false, parks: action.payload};
        case GET_PARKS_ERR:
            return {...state, isFetching: false, error: action.payload};
        default:
            return state;
    }
}