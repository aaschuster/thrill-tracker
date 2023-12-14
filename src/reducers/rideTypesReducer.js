import {
    GET_RIDE_TYPES,
    GET_RIDE_TYPES_SUCCESS,
    GET_RIDE_TYPES_ERR,
    SET_FETCHING_TRUE
} from "../actions/rideTypesActions";

const initState = {
    rideTypes: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_RIDE_TYPES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_RIDE_TYPES_SUCCESS:
            return {...state, isFetching: false, rideTypes: action.payload};
        case GET_RIDE_TYPES_ERR:
            return {...state, isFetching: false, error: action.payload};
        default:
            return state;
    }
}