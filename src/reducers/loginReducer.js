import { SET_MESSAGE } from "../actions/loginActions";

const initState = {
    message: ""
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return {...state, message: action.payload};
        default:
            return state;
    }
}