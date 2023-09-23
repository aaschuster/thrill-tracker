import { SET_MESSAGE, SET_USER } from "../actions/loginActions";

const initState = {
    message: "",
    user: {}
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return {...state, message: action.payload};
        case SET_USER:
            return {...state, user: action.payload}
        default:
            return state;
    }
}