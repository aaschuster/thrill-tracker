import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { delRecord } from "../actions/historyActions";

import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

import "../styles/History.css";

function EditMode( {processedHistory, delRecord} ) {

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
        <div className={"history"}>
            <h3>Today's rides:</h3>
            <h4 className="viewlabel">Edit view</h4>
            <hr/>
            <div className={"historyitemscontainer"}>
                {
                    processedHistory.map( (record, idx) => {
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

const mapStateToProps = state => {
    return {
        history: state.history.history,
        processedHistory: state.history.processedHistory
    }
}

export default connect(mapStateToProps, { delRecord })(EditMode);