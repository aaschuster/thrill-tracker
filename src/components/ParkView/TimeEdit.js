import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import { updateRecord } from "../../actions/historyActions";

import "../../styles/TimeEdit.css";

function TimeEdit( {onClose, open, record, updateRecord} ) {

    const [time, setTime] = useState("");

    function onChange(evt) {
        setTime(evt.target.value);
    }

    function onConfirm() {
        const [originalDate, originalTime] = record.timestamp.split(", ");

        const updatedTimestamp = new Date(`${time} ${originalDate}`);
        const timeStr = updatedTimestamp.toLocaleTimeString([], { timeStyle: "short" });

        updateRecord({rides_id: record.rides_id, timestamp: `${originalDate}, ${timeStr}`}, record.history_id);
        onClose();
    }

    useEffect(() => {
        const timeFromRecord = new Date(record.timestamp);
        setTime(timeFromRecord.toLocaleTimeString([], { hourCycle: "h24" }));
    }, [record])

    return (
        <Dialog onClose={onClose} open={open}>
            <div className="timeedit dialog">
                <h3>{record.name}</h3>
                <input 
                    type={"time"} 
                    value={time}
                    onChange={onChange}
                />
                <div className={"dialogbuttons"}>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}

export default connect(null, { updateRecord })(TimeEdit);