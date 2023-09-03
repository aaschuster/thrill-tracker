import React from "react";

function Park( { park, onClick } ) {
    return (
        <div onClick={onClick}>
            {park.name}
        </div>
    );
}

export default Park;