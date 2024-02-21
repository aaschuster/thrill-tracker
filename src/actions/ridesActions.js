import axios from "axios";

const serverURL = process.env.REACT_APP_SERVERURL;

export const GET_RIDES = "GET_RIDES";
export const GET_RIDES_SUCCESS = "GET_RIDES_SUCCESS";
export const GET_RIDES_ERR = "GET_RIDES_ERR";
export const SET_FETCHING_TRUE = "SET_FETCHING_TRUE";
export const ADD_RIDE = "ADD_RIDE";
export const UPDATE_RIDE = "UPDATE_RIDE";

export const getRides = userID => dispatch => {
    dispatch(setFetchingTrue());

    axios.get(`${serverURL}/rides`)
        .then( ({data}) => {
            const userRides = data.filter( ride => ride.users_id === userID)
            const updatedRideIDs = [];
            userRides.forEach( ride => {
                if(ride.update_of_rides_id)
                    updatedRideIDs.push(ride.update_of_rides_id);
            })

            const mainDBrides = data.filter(
                ride =>
                    ride.maindb === 1 &&
                    !updatedRideIDs.includes(ride.rides_id)
            )

            dispatch(getRidesSuccess(mainDBrides.concat(userRides)));
        })
        .catch( err => dispatch(getRidesErr(err)));

    return {type: GET_RIDES, payload: {}};
}

const setFetchingTrue = () => {
    return {type: SET_FETCHING_TRUE};
}

const getRidesSuccess = rides => {
    return {type: GET_RIDES_SUCCESS, payload: rides};
}

const getRidesErr = err => {
    return {type: GET_RIDES_ERR, payload: err.message};
}

export const addRide = ride => dispatch => {
    axios.post(`${serverURL}/rides`, ride)
        .then( ({data}) => {
            dispatch(getRides(ride.users_id));
            return data[0];
        })
        .catch( err => console.error(err))

    return {type: ADD_RIDE};

}

export const updateRide = ride => dispatch => {
    axios.put(`${serverURL}/rides/${ride.rides_id}`, ride)
        .then( () => dispatch(getRides(ride.users_id)))
        .catch( err => console.error(err));

    return {type: UPDATE_RIDE};
}
