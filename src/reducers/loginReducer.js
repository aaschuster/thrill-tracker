import { 
    SET_MESSAGE, 
    SET_USER,
    SET_USER_SUCCESS,
    SET_USER_ERR,
    SET_FETCHING_TRUE
} from "../actions/loginActions";

const initState = {
    message: "",
    isFetching: false,
    user: {},
    error: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return {...state, message: action.payload};
        case SET_USER:
            return {...state, user: action.payload}
        case SET_USER_SUCCESS:
            return {...state, isFetching: false, user: action.payload};
        case SET_USER_ERR:
            return {...state, isFetching: false, error: action.payload};
        case SET_FETCHING_TRUE:
            return {...state, isFetching: true};
        default:
            return state;
    }
}