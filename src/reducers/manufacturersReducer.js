import {
    GET_MANUFACTURERS,
    GET_MANUFACTURERS_SUCCESS,
    GET_MANUFACTURERS_ERR,
    SET_FETCHING_TRUE,
    ADD_MANUFACTURER
} from "../actions/manufacturersActions";

const initState = {
    manufacturers: [],
    isFetching: false,
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_MANUFACTURERS:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_MANUFACTURERS_SUCCESS:
            return {...state, isFetching: false, manufacturers: action.payload};
        case GET_MANUFACTURERS_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_MANUFACTURER:
            return state;
        default: 
            return state;
    }
}