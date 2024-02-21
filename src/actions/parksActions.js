import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_PARKS = "GET_PARKS";
export const GET_PARKS_SUCCESS = "GET_PARKS_SUCCESS";
export const GET_PARKS_ERR = "GET_PARKS_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_PARK = "ADD_PARK";
export const UPDATE_PARK = "UPDATE_PARK";
export const SET_CURRENT_PARK_ID = "SET_CURRENT_PARK_ID";

export const getParks = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/parks`)
        .then( ({data}) => {
            const userParks = data.filter( park => park.users_id === userID);
            const updatedParkIDs = [];
            userParks.forEach( park => {
                if(park.update_of_parks_id)
                    updatedParkIDs.push(park.update_of_parks_id);
            })
            
            const mainDBparks = data.filter(
                park => 
                    park.maindb === 1 && 
                    !updatedParkIDs.includes(park.parks_id)
                )

            dispatch(getParksSuccess(mainDBparks.concat(userParks)));
        })
        .catch( err => dispatch(getParksErr(err)));

    return {type: GET_PARKS, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getParksSuccess = parks => {
    return {type: GET_PARKS_SUCCESS, payload: parks};
}

const getParksErr = err => {
    return {type: GET_PARKS_ERR, payload: err.message};
}

export const addPark = park => dispatch => {
    return axios.post(`${serverURL}/parks`, park) 
        .then( ({data}) => {
            dispatch(getParks(park.users_id))
            return (data[0]);
        })
        .catch( err => console.error(err));
}

export const updatePark = park => dispatch => {
    axios.put(`${serverURL}/parks/${park.parks_id}`, park)
        .then( () => dispatch(getParks(park.users_id)))
        .catch( err => console.error(err));

    return {type: UPDATE_PARK}
}

export const setCurrentParkID = parkID => {
    return {type: SET_CURRENT_PARK_ID, payload: parkID};
}