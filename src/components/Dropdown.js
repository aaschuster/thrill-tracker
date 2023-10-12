import React from "react";

function Dropdown( {items} ) {
    return (
        <div className="dropdown">
            {
                items.map( item => (
                    <p>{item.name}</p>
                ))
            }
        </div>
    )
}

export default Dropdown;