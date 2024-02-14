import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import BackButton from "./Buttons/BackButton";

import { objFromID } from "../utils";

function ChainParks( { parks, chains } ) {
    let { id } = useParams();
    
    const [chain, setChain] = useState({});

    useEffect(() => {
        setChain(objFromID(parseInt(id), chains, "chains_id"));
    }, [id])

    return (
        <div className="chainparks">
            <div className="chainparksheader">
                <BackButton/>
                <h2>{chain.name}</h2>
            </div>
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