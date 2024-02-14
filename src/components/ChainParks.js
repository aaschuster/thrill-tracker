import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ParkList from "./ParkList";

import BackButton from "./Buttons/BackButton";
import HomeButton from "./Buttons/HomeButton";

import { objFromID } from "../utils";

import "../styles/ChainParks.css";

function ChainParks( { parks, chains } ) {

    const navigate = useNavigate();

    const { id } = useParams();
    
    const [chain, setChain] = useState({});
    const [currentParks, setCurrentParks] = useState([]);

    useEffect(() => {
        setChain(objFromID(parseInt(id), chains, "chains_id"));
    }, [id])
    
    useEffect(() => {
        setCurrentParks( parks.filter( park => (
            park.chains_id === chain.chains_id
        )))
    }, [chain])

    return (
        <div className="chainparks">
            <div className="chainparksheader">
                <BackButton/>
                <h2>{chain.name}</h2>
                <HomeButton/>
            </div>
            <ParkList parklist={currentParks}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        parks: state.parks.parks,
        chains: state.chains.chains
    }
}

export default connect(mapStateToProps)(ChainParks);