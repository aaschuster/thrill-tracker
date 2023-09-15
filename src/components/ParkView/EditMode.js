import React from "react";

import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

import "../../styles/ParkViewEdit.css";

function EditMode( {currentHistory} ) {
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
                                    <MdDeleteForever className={"editbutton"}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditMode;