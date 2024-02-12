import React from "react";
import { useNavigate } from "react-router-dom";

import {FaArrowRight as GoIcon} from "react-icons/fa";

function Park( { park, setDialog } ) {

    const navigate = useNavigate();

    return (
        <div className="parklistitem">
            <button 
                className="parknamebutton"
                onClick={() => setDialog({
                    open: true, 
                    park: park
                })}
            >
                {park.name}
            </button>
            <button
                onClick={() => navigate(`/atparkview/${park.parks_id}`)}
                className="parkgobutton"
            >
                <GoIcon className="goicon icon"/>
            </button>
        </div>
    );
}

export default Park;