import { combineReducers } from "redux";

import {reducer as parks} from "./parksReducer";
import {reducer as rides} from "./ridesReducer";
import {reducer as history} from "./historyReducer";
import {reducer as login} from "./loginReducer";

export const reducer = combineReducers({
    parks,
    rides,
    history,
    login
})