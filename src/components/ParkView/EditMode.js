import React from "react";
import { connect } from "react-redux";

import { delRecord } from "../../actions/historyActions";

import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

import "../../styles/ParkViewEdit.css";

function EditMode( {currentHistory, delRecord} ) {
    return (
        <div className={"parkviewedit"}>
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
                                    <AiFillEdit className={"editbutton"}/>
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