import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {FaHouse as HouseIcon} from "react-icons/fa6";

import ParkList from "./ParkList";
import BackButton from "./Buttons/BackButton";
import AddParkButton from "./Buttons/AddParkButton";
import ViewChainsButton from "./Buttons/ViewChainsButton";

import "../styles/Search.css";

const Search = ( { parks } ) => {

    const navigate = useNavigate();

    const [inputVal, setInputVal] = useState("");
    const [currentParks, setCurrentParks] = useState([]);

    function onChange(evt) {
        setInputVal(evt.target.value);
    }

    function processString(str) {
        return str.toLowerCase().replace(/\s/g, "");
    }

    useEffect(() => {
        
        const processedInput = processString(inputVal);

        const parksStartWithInput = parks.filter( 
            park => processString(park.name).startsWith(processedInput)
        );

        const parksContainInput = parks.filter(
            park => processString(park.name).includes(processedInput)
        )

        const parksFromSearch = [...parksStartWithInput];

        parksContainInput.forEach( parkContainsInput => {

            if(parksStartWithInput.filter( parkStartsWithInput => 
                parkContainsInput.parks_id === parkStartsWithInput.parks_id
            ).length === 0) {
                parksFromSearch.push(parkContainsInput);
            }

        })

        setCurrentParks(parksFromSearch);
        
}, [inputVal])

    return (
        <div className="search">
            <div className="searchheader">
                <BackButton/>
                <h2>Search parks</h2>
            </div>
            <input 
                value={inputVal}
                placeholder="Park name..."
                onChange={onChange}
                autoFocus
            />
            {
                inputVal==="" ? 
                    <div className="emptyinput">
                        <button className="homebutton" onClick={() => navigate("/parkselect")}>
                            <HouseIcon className="homeicon icon"/>
                            <p>Go back home</p>
                        </button>
                        <ViewChainsButton/>
                    </div>
                : <></>
            }
            {
                currentParks.length === 0 ?
                    <div className="noresults">
                        <h2>No results</h2>
                    </div>
                : <></>
            }
            {
                inputVal && currentParks.length > 0 ?
                    <div className="results">
                        <ParkList parklist={currentParks}/>
                    </div>
                : <></>
            }            
            <p className="cantfindtext">Can't find what you're looking for? Contribute to ThrillTracker</p>
            <AddParkButton/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        parks: state.parks.parks
    }
}

export default connect(mapStateToProps)(Search);