import React from "react";

function Dropdown( {items} ) {
    return (
        <div className="dropdown">
            {
                items.map( (item, idx) => (
                    <div key={idx}>
                    <p>{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Dropdown;