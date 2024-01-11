import React from "react"

export default function Dice(props) {

    const { id, isHeld, value } = props.diceProps

    
    // function toggleHandle() {
    //     console.log(id)
    // }

    return (
        <div className="dice" style={{backgroundColor: isHeld ? '#59E391' : '#FFFFFF',}} onClick={props.holdDice} >
            <h2 className="dice-num">{value}</h2>
        </div>
    )
}
