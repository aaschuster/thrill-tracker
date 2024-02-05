import React from "react";

import {AiFillEdit as EditIcon} from "react-icons/ai";

function Park( { park, parkNameClick } ) {
    return (
        <div className="parklistitem">
            <button className="parknamebutton" onClick={parkNameClick}>
                {park.name}
            </button>
            <button className="parkeditbutton">
                <EditIcon className="editicon"/>
            </button>
        </div>
    );
}

export default Park;