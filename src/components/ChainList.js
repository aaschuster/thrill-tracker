import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import BackButton from "./Buttons/BackButton";
import HomeButton from "./Buttons/HomeButton";

// import "../styles/ChainList.css";

function ChainList( {chains} ) {

    const navigate = useNavigate();

    return (
        <div className="chainlist">
            <div className="chainlistheader">
                <BackButton/>
                <h2>Park chains</h2>
                <HomeButton/>
            </div>
            {
                chains.map( (chain, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(`/chains/${chain.chains_id}`)}
                    >
                        {chain.name}
                    </button>
                ))
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        chains: state.chains.chains
    }
}

export default connect(mapStateToProps)(ChainList);