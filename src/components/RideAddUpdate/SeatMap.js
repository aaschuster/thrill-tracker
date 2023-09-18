import React, { useState, useRef, useEffect } from "react";

function SeatMap( { seatArr, checkSeat, seatOnClick } ) {

    const [seatButtonsWidth, setSeatButtonsWidth] = useState("auto");

    const seatButtonsRef = useRef(null);

    useEffect(() => {
        if(seatButtonsRef.current) {
            if(seatButtonsRef.current.offsetHeight > 51) {
                setSeatButtonsWidth(`${seatArr[0].length / 2 * 50}px`);
            }
        }
    }, [seatArr]);

    return (
        <div className="seatmap"> 
            {
                seatArr.map( (row, rowIdx) => {
                    return (
                        <div className={`row ${seatButtonsWidth === "auto" ? "singlerow":""}`} key={rowIdx}> 
                            <p style={{width: seatButtonsWidth === "auto" ? "auto" : "100%"}}>Row {rowIdx+1}</p>
                            <div 
                                className={"seatbuttons"} 
                                ref={seatButtonsRef} 
                                style={{width: seatButtonsWidth}}
                            > 
                                {
                                    row.map( (seat, seatIdx) => {
                                        return <button 
                                                    type={"button"}
                                                    key={seatIdx}
                                                    className={checkSeat(rowIdx+1, seat) ? "fakedisabled" : ""}
                                                    onClick={() => seatOnClick(rowIdx+1, seat)}
                                                >
                                                    {seat}
                                                </button>
                                    })
                                }
                            </div>
                        </div>
                    )
                })                            
            }
        </div>   
    )
}

export default SeatMap;