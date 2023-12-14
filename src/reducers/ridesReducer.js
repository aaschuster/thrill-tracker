import {
    GET_RIDES,
    GET_RIDES_SUCCESS,
    GET_RIDES_ERR,
    SET_FETCHING_TRUE,
    UPDATE_RIDE,
    ADD_RIDE
} from "../actions/ridesActions";

const initState = {
    rides: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_RIDES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_RIDES_SUCCESS:
            return {...state, isFetching: false, rides: action.payload};
        case GET_RIDES_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_RIDE:
            return state;
        case UPDATE_RIDE:
            return state;
        default:
            return state;
    }
}