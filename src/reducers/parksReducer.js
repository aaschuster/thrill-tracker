import {
    GET_PARKS,
    GET_PARKS_SUCCESS,
    GET_PARKS_ERR,
    SET_FETCHING_TRUE,
    ADD_PARK,
    UPDATE_PARK,
    SET_CURRENT_PARK_ID
} from "../actions/parksActions";

const initState = {
    parks: [],
    currentParkID: null,
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
        case ADD_PARK:
            return state;
        case UPDATE_PARK:
            return state;
        case SET_CURRENT_PARK_ID:
            return {...state, currentParkID: action.payload};
        default:
            return state;
    }
}