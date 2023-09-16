import {
    GET_HISTORY,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_ERR,
    SET_FETCHING_TRUE,
    ADD_RECORD,
    DEL_RECORD
} from "../actions/historyActions";

const initState = {
    history: [],
    isFetching: false,
    error: ""
};

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case GET_HISTORY:
            return state;
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        case GET_HISTORY_SUCCESS:
            return {...state, isFetching: false, history: action.payload};
        case GET_HISTORY_ERR:
            return {...state, isFetching: false, error: action.payload};
        case ADD_RECORD:
            return state;
        case DEL_RECORD:
            return state;
        default:
            return state;
    }
}