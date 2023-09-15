import { combineReducers } from "redux";

import {reducer as parks} from "./parksReducer";
import {reducer as rides} from "./ridesReducer";
import {reducer as history} from "./historyReducer";

export const reducer = combineReducers({
    parks,
    rides,
    history
})