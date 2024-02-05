import { combineReducers } from "redux";

import {reducer as parks} from "./parksReducer";
import {reducer as rides} from "./ridesReducer";
import {reducer as history} from "./historyReducer";
import {reducer as user} from "./userReducer";
import {reducer as chains} from "./chainsReducer";
import {reducer as states} from "./statesReducer";
import {reducer as countries} from "./countriesReducer";
import {reducer as manufacturers} from "./manufacturersReducer";
import {reducer as rideTypes} from "./rideTypesReducer";
import {reducer as ridesRideTypes} from "./ridesRideTypesReducer";
import {reducer as rideFavorites} from "./rideFavoritesReducer";
import {reducer as parkFavorites} from "./parkFavoritesReducer";

export const reducer = combineReducers({
    parks,
    rides,
    history,
    user,
    chains,
    states,
    countries,
    manufacturers,
    rideTypes,
    ridesRideTypes,
    rideFavorites,
    parkFavorites
})