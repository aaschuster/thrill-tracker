export const SET_MESSAGE = "SET_MESSAGE";
export const SET_USER = "SET_USER";

export const setMessage = message => {
    return {type: SET_MESSAGE, payload: message};
}

export const setUser = userID => {
    return {type: SET_USER, payload: userID}
}