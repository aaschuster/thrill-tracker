import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import DatalistInput from "react-datalist-input";

import { MdDeleteForever } from "react-icons/md";

import BackButton from "../Buttons/BackButton";
import HomeButton from "../Buttons/HomeButton";

import "../../styles/RideAddUpdate.css";

import { addRide, updateRide } from "../../actions/ridesActions";
import { addManufacturer } from "../../actions/manufacturersActions";
import { addRidesRideType, delRidesRideType } from "../../actions/ridesRideTypesActions";
import { addRideFavorite, delRideFavorite } from "../../actions/rideFavoritesActions";

import { objFromID } from "../../utils";

function RideAddUpdate( {
    rides, 
    parks, 
    rideTypes, 
    ridesRideTypes, 
    currentParkID, 
    manufacturers, 
    user,
    rideFavorites,
    addRide, 
    updateRide, 
    addManufacturer,
    addRidesRideType,
    delRidesRideType,
    addRideFavorite,
    delRideFavorite
} ) {

    const { rideId } = useParams();

    const rideInt = parseInt(rideId);

    const navigate = useNavigate();

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
        ride_height: "",
        drop_height: "",
        rows: "",
        seats: "",
        ride_type: ""
    }

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");
    const [filtered, setFiltered] = useState({
        park: [],
        manufacturer: []
    })
    const [submitFired, setSubmitFired] = useState(false);
    const [datalists, setDatalists] = useState({});
    const [origRideTypes, setOrigRideTypes] = useState([]);
    const [rideTypeList, setRideTypeList] = useState([]);
    const [dialog, setDialog] = useState({
        open: false,
        message: "An error has occurred."
    })

    useEffect(() => {
        
        setDatalists({...datalists,
            parks: parks.map( park => {
                return{id: park.parks_id, value: park.name};
            }),
            manufacturers: manufacturers.map( manufacturer => {
                return{id: manufacturer.manufacturers_id, value: manufacturer.name}
            }),
            rideTypes: rideTypes.map( rideType => {
                return{id: rideType.ride_types_id, value: rideType.ride_type};
            })
        })
    
        const [currentPark] = parks.filter( park => park.parks_id === currentParkID);

        if(currentParkID) 
            setForm({
                ...form, 
                parkID: currentParkID,
                park: currentPark.name
            })

    }, [parks, manufacturers, currentParkID])

    useEffect(() => {
        if(submitFired) {
            setSubmitFired(false);

            if(filtered.park.length === 1 && (filtered.manufacturer.length === 1 || !form.manufacturer)) {
                submitRide();
                return;
            }

            if(filtered.park.length === 0)
                setErr("Please select a valid park.");
            else
                setDialog({
                    message: `This will add "${form.manufacturer}" as a manufacturer to the database.`,
                    open: true
                })

        }
    }, [filtered])
    
    useEffect(() => {
        filterData();
    }, [manufacturers])

    useEffect(() => {
        if(editMode && rides[0]) {
            let filteredRide;
            [filteredRide] = rides.filter(
                ride =>
                    ride.rides_id === rideInt
            )

            const currentRideData = {
                park: parks.filter( park => park.parks_id === filteredRide.parks_id),
                manufacturer: manufacturers.filter( 
                    manufacturer => 
                        manufacturer.manufacturers_id === filteredRide.manufacturers_id
                )
            }

            const filteredRideTypes = [];
            const ridesRideTypesToStore = [];

            ridesRideTypes.forEach( ridesRideType => {
                if(ridesRideType.rides_id === filteredRide.rides_id) {
                    ridesRideTypesToStore.push(ridesRideType);
                    const [rideTypeToAdd] = 
                        rideTypes.filter( rideType => 
                            rideType.ride_types_id === ridesRideType.ride_types_id);
                    filteredRideTypes.push({
                        id: rideTypeToAdd.ride_types_id, 
                        value: rideTypeToAdd.ride_type
                    });
                }
            })

            setOrigRideTypes(ridesRideTypesToStore);
            setRideTypeList(filteredRideTypes);
            
            setForm({
                name: filteredRide.name,
                park: currentRideData.park[0].name,
                manufacturer: currentRideData.manufacturer[0] ? 
                    currentRideData.manufacturer[0].name : 
                    "",
                duration: filteredRide.duration || "",
                track_length: filteredRide.track_length || "",
                inversions: 
                    filteredRide.inversions === null || 
                    filteredRide.inversions === undefined ? 
                        "" : 
                        filteredRide.inversions,
                ride_height: filteredRide.ride_height || "",
                drop_height: filteredRide.drop_height || "",
                rows: filteredRide.rows || "",
                seats: filteredRide.seats || ""
            })
        }
    }, [rides, ridesRideTypes])

    function onSubmit(e) {
        e.preventDefault();

        if(form.name && form.park) {
            setSubmitFired(true);
            filterData();
        } else setErr("Please fill out required fields.");
    }

    async function submitRide() {

        if(editMode) {

            if(objFromID(rideInt, rides, "rides_id").maindb === 1) {
                const newRideID = await addRide({
                    name: form.name,
                    parks_id: filtered.park[0].parks_id,
                    manufacturers_id: filtered.manufacturer.length === 1 ? filtered.manufacturer[0].manufacturers_id : null,
                    duration: form.duration,
                    track_length: form.track_length,
                    inversions: form.inversions,
                    ride_height: form.ride_height,
                    drop_height: form.drop_height,
                    rows: form.rows,
                    seats: form.seats,
                    users_id: user.users_id,
                    update_of_rides_id: rideInt
                })

                const [rideFavorite] = rideFavorites.filter( ride => ride.rides_id === rideInt);
                if(rideFavorite) {
                    delRideFavorite(rideFavorite);
                    addRideFavorite({users_id: user.users_id, rides_id: newRideID});
                }

                rideTypeList.forEach( rideType => {
                    addRidesRideType({ride_types_id: rideType.id, rides_id: newRideID});
                })

            } else {

                updateRide({
                    name: form.name,
                    parks_id: filtered.park[0].parks_id,
                    manufacturers_id: 
                        filtered.manufacturer.length === 1 ? 
                            filtered.manufacturer[0].manufacturers_id : 
                            null,
                    duration: form.duration,
                    track_length: form.track_length,
                    inversions: form.inversions,
                    ride_height: form.ride_height,
                    drop_height: form.drop_height,
                    rows: form.rows,
                    seats: form.seats,
                    rides_id: rideInt,
                    users_id: user.users_id
                })
    
                //newRideType example = {id: 1, value: "Rollercoaster"}
                //origRideType example = {rides_ride_types: 1, ride_types_id: 1, rides_id1}
    
                rideTypeList.forEach( newRideType => { 
                    let addRideType = true;
                    origRideTypes.forEach( origRideType => {
                        if(newRideType.id === origRideType.ride_types_id) {
                            addRideType = false;
                        }
                    })
                    if(addRideType)
                        addRidesRideType({ride_types_id: newRideType.id, rides_id: rideInt})
                })
    
                origRideTypes.forEach( origRideType => {
                    let removeRideType = true;
                    rideTypeList.forEach( newRideType => {
                        if(newRideType.id === origRideType.ride_types_id) {
                            removeRideType = false;
                        }
                    })
                    if(removeRideType)
                        delRidesRideType(origRideType.rides_ride_types);
                })

            }

        } else {
            addRide({
                name: form.name,
                parks_id: filtered.park[0].parks_id,
                manufacturers_id: filtered.manufacturer.length === 1 ? filtered.manufacturer[0].manufacturers_id : null,
                duration: form.duration,
                track_length: form.track_length,
                inversions: form.inversions,
                ride_height: form.ride_height,
                drop_height: form.drop_height,
                rows: form.rows,
                seats: form.seats,
                users_id: user.users_id
            });
        }

        navigate(-1);
    }

    function onChange(e, id) {
        setErr("");
        const {target} = e;
        setForm({...form, [id ? id : target.id]: target.value})
    }

    function filterData() {
        setFiltered({
            park: parks.filter( park => form.park.toLowerCase() === park.name.toLowerCase()),
            manufacturer: manufacturers.filter( manufacturer => form.manufacturer.toLowerCase() === manufacturer.name.toLowerCase())
        })
        //triggers filtered useEffect -- logic continues above
    }

    function submitFromDialog() {
        setSubmitFired(true);
        addManufacturer({name: form.manufacturer});
    }

    function cancelDialog() {
        setDialog({...dialog, open: false});
        setSubmitFired(false);
    }

    function rideTypeSelect(item) {
        setDatalists({...datalists, rideTypes: datalists.rideTypes.filter( rideType => rideType.id !== item.id )});
        setRideTypeList([...rideTypeList, item]);
        setForm({...form, ride_type: ""});
    }

    function removeRideTypeSelect(item) {
        setDatalists({...datalists, rideTypes: [...datalists.rideTypes, item]})
        setRideTypeList(rideTypeList.filter( rideType => rideType.id !== item.id))
        setForm({...form, ride_type: ""});
    }

    return (
        <div className="rideaddupdate">
            <Dialog onClose={() => setDialog({...dialog, open: true})} open={dialog.open}>
                <div className="addmanufacturer dialog">
                    <p>{dialog.message}</p>
                    <div className="dialogbuttons">
                        <button onClick={submitFromDialog}>Confirm</button>
                        <button onClick={cancelDialog}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            <div className="rideaddupdateheader">
                <BackButton/>
                <h2>{editMode ? "Update" : "Add"} Ride</h2>
                <HomeButton/>
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

                <div className="formitem">
                    <label className="inputlabel">{"Duration (seconds)"}</label>
                    <input type="number" id="duration" value={form.duration} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">{"Track length (ft)"}</label>
                    <input type="number" id="track_length" value={form.track_length} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Inversions</label>
                    <input type="number" id="inversions" value={form.inversions} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">{"Ride height (ft)"}</label>
                    <input type="number" id="ride_height" value={form.ride_height} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">{"Drop height (ft)"}</label>
                    <input type="number" id="drop_height" value={form.drop_height} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">{"Rows (train length)"}</label>
                    <input type="number" id="rows" value={form.rows} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">{"Seats (train width)"}</label>
                    <input type="number" id="seats" value={form.seats} onChange={onChange}/>
                </div>

                <div className="ridetypes">
                    <div className="formitem">
                        <label className="inputlabel">{"Ride type(s)"}</label>
                        <div className="datalistcontainer">
                            {
                                datalists.rideTypes ?
                                <DatalistInput
                                    value={form.ride_type}
                                    onChange={e => onChange(e, "ride_type")}
                                    showLabel={false}
                                    items={datalists.rideTypes}
                                    onSelect={item => rideTypeSelect(item)}
                                /> : <></>
                            }
                        </div>
                    </div>

                    <div className="selectedtypescontainer">
                        {
                            rideTypeList.map( rideType => (
                            <div key={rideType.id} className="selectedtypeitem">
                                <p>{rideType.value}</p>
                                <MdDeleteForever className="editbutton" onClick={() => removeRideTypeSelect(rideType)}/>
                            </div>
                            ))
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
        rides: state.rides.rides,
        parks: state.parks.parks,
        rideTypes: state.rideTypes.rideTypes,
        ridesRideTypes: state.ridesRideTypes.ridesRideTypes,
        currentParkID: state.parks.currentParkID,
        manufacturers: state.manufacturers.manufacturers,
        user: state.user.user,
        rideFavorites: state.rideFavorites.rideFavorites
    }
}

export default connect(
    mapStateToProps, { 
        addRide, 
        updateRide, 
        addManufacturer,
        addRidesRideType,
        delRidesRideType,
        addRideFavorite,
        delRideFavorite
    }
)(RideAddUpdate);