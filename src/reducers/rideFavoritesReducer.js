import {
    GET_RIDE_FAVORITES,
    GET_RIDE_FAVORITES_SUCCESS,
    GET_RIDE_FAVORITES_ERR,
    SET_FETCHING_TRUE,
    ADD_RIDE_FAVORITE,
    DEL_RIDE_FAVORITE
} from "../actions/rideFavoritesActions";

const initState = {
    rideFavorites: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_RIDE_FAVORITES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_RIDE_FAVORITES_SUCCESS:
            return {...state, isFetching: false, rideFavorites: action.payload};
        case GET_RIDE_FAVORITES_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_RIDE_FAVORITE:
            return state;
        case DEL_RIDE_FAVORITE:
            return state;
        default:
            return state;
    }
}