import { combineReducers } from "redux";

import {reducer as parks} from "./parksReducer";
import {reducer as rides} from "./ridesReducer";
import {reducer as history} from "./historyReducer";
import {reducer as login} from "./loginReducer";
import {reducer as chains} from "./chainsReducer";
import {reducer as states} from "./statesReducer";
import {reducer as countries} from "./countriesReducer";

export const reducer = combineReducers({
    parks,
    rides,
    history,
    login,
    chains,
    states,
    countries
})