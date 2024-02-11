import {
    GET_HOME_PARKS,
    GET_HOME_PARKS_SUCCESS,
    GET_HOME_PARKS_ERR,
    SET_FETCHING_TRUE,
    ADD_PARK_FAVORITE,
    DEL_PARK_FAVORITE
} from "../actions/homeParksActions";

const initState = {
    homeParks: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_HOME_PARKS:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_HOME_PARKS_SUCCESS:
            return {...state, isFetching: false, homeParks: action.payload};
        case GET_HOME_PARKS_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_PARK_FAVORITE:
            return state;
        case DEL_PARK_FAVORITE:
            return state;
        default:
            return state;
    }
}