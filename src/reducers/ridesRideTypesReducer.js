import {
    GET_RIDES_RIDE_TYPES,
    GET_RIDES_RIDE_TYPES_SUCCESS,
    GET_RIDES_RIDE_TYPES_ERR,
    SET_FETCHING_TRUE,
    ADD_RIDES_RIDE_TYPE,
    DEL_RIDES_RIDE_TYPE 
} from "../actions/ridesRideTypesActions";

const initState = {
    ridesRideTypes: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_RIDES_RIDE_TYPES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_RIDES_RIDE_TYPES_SUCCESS:
            return {...state, isFetching: false, ridesRideTypes: action.payload};
        case GET_RIDES_RIDE_TYPES_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_RIDES_RIDE_TYPE:
            return state;
        case DEL_RIDES_RIDE_TYPE:
            return state;
        default:
            return state;
    }
}