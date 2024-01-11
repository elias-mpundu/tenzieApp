import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Dice from "./component/Die";
import { nanoid } from 'nanoid'

import "./App.css";

export default function App() {

  //Note: When app is first run, state is initialized by calling the allNewDice function.
  const [dice, setDice] = useState(allNewDice);

  //Generate new dice numbers in array.
  function allNewDice() {
    const diceNums = [];

    for (let i = 0; i < 10; i++) {
      let randNum = Math.floor(Math.random() * 6) + 1;
      diceNums.push({
        value: randNum, 
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceNums;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return (
        die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
      )
    }))
  }

  /* Note: The roll button resets state by calling a function that sets state to a new array */
  function rollDice() {
    setDice(allNewDice())
  }

  /* Maps over state with the assigned array and assigns values to each dice */
  const diceValues = dice.map((dice) => {
    return (
    <Dice 
      key={dice.id} 
      diceProps={dice} 
      holdDice={() => {holdDice(dice.id)}} 
    />
    )
  })

  return (
    <main>
      <div id="dice-container">
        {diceValues}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}
