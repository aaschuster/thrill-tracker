import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import DatalistInput from "react-datalist-input";

import BackButton from "../BackButton";

import "../../styles/RideAddUpdate.css";

function RideAddUpdate( {parks, currentParkID, manufacturers} ) {
    const { rideId } = useParams();

    const editMode = rideId !== "add";

    const initForm = {
        name: "",
        park: "",
        parkID: null,
        manufacturer: "",
        manufacturerID: null,
        duration: "",
        track_length: "",
        inversions: "",
        drop_height: "",
        rows: "",
        seats: "",
    }

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");
    const [datalists, setDatalists] = useState({});

    useEffect(() => {

        setDatalists({...datalists,
            parks: parks.map( park => {
                return{id: park.parks_id, value: park.name};
            }),
            manufacturers: manufacturers.map( manufacturer => {
                return{id: manufacturer.manufacturers_id, value: manufacturer.name}
            })
        })
    
        const [currentPark] = parks.filter( park => park.parks_id === currentParkID);

        setForm({
            ...form, 
            parkID: currentParkID,
            park: currentPark.name
        })

    }, [parks, currentParkID])

    function onSubmit(e) {
        e.preventDefault();
    }

    function onChange(e, id) {
        setErr("");
        const {target} = e;
        setForm({...form, [id ? id : target.id]: target.value})
    }

    return (
        <div className="rideaddupdate">
            <div className="rideaddupdateheader">
                <BackButton/>
                <h2>{editMode ? "Update" : "Add"} Ride</h2>
            </div>
            <form className="addupdateform" onSubmit={onSubmit}>

                <div className="formitem">
                    <label className="inputlabel">Name*</label>
                    <input id="name" value={form.name} onChange={onChange} autoFocus/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Park*</label>
                    <div className="datalistcontainer">
                        {
                            datalists.parks ?
                            <DatalistInput
                                value={form.park}
                                onChange={e => onChange(e, "park")}
                                showLabel={false}
                                items={datalists.parks}
                                onSelect={item => setForm({
                                    ...form,
                                    park: item.value,
                                    parkID: item.id
                                })}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Manufacturer</label>
                    <div className="datalistcontainer">
                        {
                            datalists.manufacturers ?
                            <DatalistInput
                                value={form.manufacturer}
                                onChange={e => onChange(e, "manufacturer")}
                                showLabel={false}
                                items={datalists.manufacturers}
                                onSelect={item => setForm({
                                    ...form,
                                    manufacturer: item.value,
                                    manufacturerID: item.id
                                })}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="textcontainer">
                    <p>*Required fields</p>
                    <p className="err">{err}</p>
                </div>

                <button>{editMode ? "Update" : "Add"}</button>

            </form>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        parks: state.parks.parks,
        currentParkID: state.parks.currentParkID,
        manufacturers: state.manufacturers.manufacturers
    }
}

export default connect(mapStateToProps)(RideAddUpdate);