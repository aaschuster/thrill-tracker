import React, { useState, useRef, useEffect } from "react";

function SeatMap( { seatArr, checkSeat, seatOnClick } ) {

    const [seatButtonsWidth, setSeatButtonsWidth] = useState("auto");
    const [rowLabelWrapped, setRowLabelWrapped] = useState(false);

    const seatButtonsRef = useRef(null);
    const rowRef = useRef(null);

    useEffect(() => {
        const rowHeight = rowRef.current.offsetHeight;

        if(rowRef.current) {
            if(rowHeight > 70) { //seat buttons have wrapped into multiple rows
                setSeatButtonsWidth(`${seatArr[0].length / 2 * 50}px`);
            }
            if(rowHeight > 50) { //row label has wrapped
                setRowLabelWrapped(true);
            }
        }
    }, [seatArr]);

    return (
        <div className="seatmap"> 
            {
                seatArr.map( (row, rowIdx) => {
                    return (
                        <div className={`row ${!rowLabelWrapped ? "singlerow": "multirow"}`} key={rowIdx} ref={rowRef}> 
                            <p style={{width: !rowLabelWrapped ? "auto" : "100%"}}>Row {rowIdx+1}</p>
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