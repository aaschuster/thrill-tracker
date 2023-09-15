import { combineReducers } from "redux";

import {reducer as parks} from "./parksReducer";
import {reducer as rides} from "./ridesReducer";

export const reducer = combineReducers({
    parks,
    rides
})