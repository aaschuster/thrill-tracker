import {
    GET_COUNTRIES,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_ERR,
    SET_FETCHING_TRUE
} from "../actions/countriesActions";

const initState = {
    countries: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_COUNTRIES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_COUNTRIES_SUCCESS:
            return {...state, isFetching: false, countries: action.payload};
        case GET_COUNTRIES_ERR:
            return {...state, isFetching: false, error: action.payload};
        default:
            return state;
    }
}