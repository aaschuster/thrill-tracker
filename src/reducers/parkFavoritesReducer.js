import {
    GET_PARK_FAVORITES,
    GET_PARK_FAVORITES_SUCCESS,
    GET_PARK_FAVORITES_ERR,
    SET_FETCHING_TRUE,
    ADD_PARK_FAVORITE,
    DEL_PARK_FAVORITE
} from "../actions/parkFavoritesActions";

const initState = {
    parkFavorites: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_PARK_FAVORITES:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_PARK_FAVORITES_SUCCESS:
            return {...state, isFetching: false, parkFavorites: action.payload};
        case GET_PARK_FAVORITES_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_PARK_FAVORITE:
            return state;
        case DEL_PARK_FAVORITE:
            return state;
        default:
            return state;
    }
}