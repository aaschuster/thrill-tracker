import React from "react";

import {AiFillEdit as EditIcon} from "react-icons/ai";

function Park( { park, parkNameClick, setDialog } ) {
    return (
        <div className="parklistitem">
            <button className="parknamebutton" onClick={parkNameClick}>
                {park.name}
            </button>
            <button 
                onClick={() => setDialog({
                    open: true, 
                    parkID: park.parks_id, 
                    parkName: park.name
                })}
                className="parkeditbutton"
            >
                <EditIcon className="editicon"/>
            </button>
        </div>
    );
}

export default Park;