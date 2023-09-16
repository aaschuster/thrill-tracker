import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";

import "../../styles/TimeEdit.css";

function TimeEdit( {onClose, open, record} ) {

    const [time, setTime] = useState("");

    function onChange(evt) {
        setTime(evt.target.value);
    }

    useEffect(() => {
        const time = new Date(`2023-09-16 ${record.timeonly}`);
        setTime(time.toLocaleTimeString([], { hourCycle: "h24" }));
    }, [record])

    return (
        <Dialog onClose={onClose} open={open} >
            <div className="timeedit">
                <h3>{record.name}</h3>
                <input 
                    type={"time"} 
                    value={time}
                    onChange={onChange}
                />
                <div className={"dialogbuttons"}>
                    <button>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}

export default TimeEdit;