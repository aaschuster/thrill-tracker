import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import BackButton from "../BackButton";
import Dropdown from "../Dropdown";

import "../../styles/ParkAddUpdate.css";

function ParkAddUpdate( {chains, states, countries} ) {

    const navigate = useNavigate();

    const initForm = {
        name: "",
        chain: "",
        state: "",
        country: "",
        openingyear: ""
    }

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");
    const [inputWidth, setInputWidth] = useState(100);
    const [openDropdown, setOpenDropdown] = useState("none");

    const inputRef = useRef(null);

    const labelSize = 125;

    function searchList(list, keyword) {
        keyword = keyword.toLowerCase();
        return list.filter( li => {
            if(li.name.toLowerCase().includes(keyword)) return li;
        })
    }

    function onChange(evt) {
        setErr("");
        const {target} = evt;
        setOpenDropdown(target.id);
        setForm({...form, [target.id]: target.value})
    }

    useEffect(() => {

        setInputWidth(inputRef.current.offsetWidth);

    }, [inputWidth])

    return (
        <div className="parkaddupdate">
            {
                openDropdown === "none" ? <></> : <div className="background" onClick={() => setOpenDropdown("none")}></div>
            }
            <div className="parkaddupdateheader">
                <BackButton/>
                <h2>Add Park</h2>
            </div>
            <form>

                <div className="formitem">
                    <label>Name:</label>
                    <input id="name" value={form.name} onChange={onChange} ref={inputRef}/>
                </div>

                <div className="formitem">
                    <label>Chain:</label>
                    <div>
                        <input id="chain" value={form.chain} onChange={onChange}/>
                        <div 
                            className={`dropdowncontainer ${ openDropdown === "chain" ? "" : "hidden"}`} 
                            style={{width: inputWidth-4}}
                        >
                            <Dropdown items={searchList(chains, form.chain)} />
                        </div>
                    </div>
                </div>

                <div className="formitem">
                    <label>State:</label>
                    <input id="state" value={form.state} onChange={onChange}/>
                </div>

                <div className={`dropdowncontainer ${ openDropdown === "state" ? "" : "hidden"}`} style={{
                    width: inputWidth-4
                }}>
                    <Dropdown items={states} />
                </div>

                <div className="formitem">
                    <label>Country:</label>
                    <input id="country" value={form.country} onChange={onChange}/>
                </div>

                <div className={`dropdowncontainer ${ openDropdown === "country" ? "" : "hidden"}`} style={{
                    width: inputWidth-4
                }}>
                    <Dropdown items={countries} />
                </div>

                <div className="formitem">
                    <label>Opening year:</label>
                    <input id="openingyear" value={form.openingyear} onChange={onChange}/>
                </div>

            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        chains: state.chains.chains,
        states: state.states.states,
        countries: state.countries.countries
    }
}

export default connect(mapStateToProps)(ParkAddUpdate);