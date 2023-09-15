import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ParkViewHeader from "./ParkViewHeader";

// import "../../styles/ParkViewEdit.css";

function ParkViewEdit() {

    const { id } = useParams();

    return (
        <div className={"parkviewedit"}>
            <ParkViewHeader name={"Six Flags Great America"}/>
            <h4 className="viewlabel">Edit view</h4>
            <hr/>
            <div className={"edithistory"}>
                <>This is some stuff</>
            </div>
            <>ParkViewEdit{id}</>
        </div>
    )
}

export default ParkViewEdit;