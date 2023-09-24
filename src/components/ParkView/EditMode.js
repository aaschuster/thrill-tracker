import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { delRecord } from "../../actions/historyActions";

import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

import "../../styles/EditMode.css";

function EditMode( {currentHistory, delRecord} ) {

    const blankRecord = {
        drop_height: null,
        duration: null,
        history_id: null,
        inversions: null,
        manufacturers_id: null,
        name: "No record selected.",
        parks_id: null,
        rides_id: null,
        timeonly: "--:-- --",
        track_length: null
    }

    const navigate = useNavigate();

    function editOnClick(record) {
        navigate(`/addupdate/${record.rides_id}/${record.history_id}`);
    }

    return (
        <div className={"parkviewedit"}>
            <h3>Today's rides:</h3>
            <h4 className="viewlabel">Edit view</h4>
            <hr/>
            <div className={"history"}>
                {
                    currentHistory.map( (record, idx) => {
                        return (
                            <div key={idx} className={"historyitem"}>
                                <div className={"textcontainer"}>
                                    <span className={"recordname"}>{record.name}</span>
                                    <span className={"timestamp"}>{record.timeonly}</span>
                                </div>                                
                                <div className={"editbuttoncontainer"}>
                                    <AiFillEdit className={"editbutton"} onClick={() => editOnClick(record)}/>
                                    <MdDeleteForever className={"editbutton"} onClick={() => delRecord(record.history_id)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default connect(null, { delRecord })(EditMode);