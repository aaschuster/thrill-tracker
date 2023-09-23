export const SET_MESSAGE = "SET_MESSAGE";

export const setMessage = message => {
    return {type: SET_MESSAGE, payload: message};
}