import React from "react";

function Park( { park, onClick } ) {
    return (
        <button onClick={onClick}>
            {park.name}
        </button>
    );
}

export default Park;