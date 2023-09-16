import React from "react";
import Dialog from "@mui/material/Dialog";

// import "../../styles/TimeEdit.css";

function TimeEdit( {onClose, open, record} ) {
    return (
        <Dialog onClose={onClose} open={open}>
            <>
                {record.name}
                {record.timeonly}
            </>
        </Dialog>
    )
}

export default TimeEdit;