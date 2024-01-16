import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Dice from "./component/Die";
import { nanoid } from "nanoid";

import "./App.css";

export default function App() {
  //Note: When app is first run, state is initialized by calling the allNewDice function.
  const [dice, setDice] = useState(allNewDice);


  //newDiceLoop generates a new value for each die. Isolating this behavior makes it easier to malnipulate the result 
  function newDiceLoop() {
    let randNum = Math.floor(Math.random() * 6) + 1;
    return {
      value: randNum,
      isHeld: false,
      id: nanoid(),
    }
  }

  //Generate new dice numbers in array.
  function allNewDice() {
    const diceObjs = [];

    for (let i = 0; i < 10; i++) {
      let randNum = Math.floor(Math.random() * 6) + 1;
      //the push method pushes the result of newDiceLoop, an object, into the diceObjs array. 
      diceObjs.push(newDiceLoop());
    }
    return diceObjs;
  }

  /* The roll button resets state by calling a function that sets state to a new array */
  function rollDice() {
    setDice((prevDice) => 
      prevDice.map((die) => {
        return (
          die.isHeld ? 
          {...die} : 
          (newDiceLoop())) ;
      })
    )
  }

  //holdDice Malnipulates state in such a way that only the clicked dice changes color
  //Recall the ternary function created in the Die.jsx
  //This function applied to each individual dice allows us to malnipulate each die independent of the rest.
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  /* Maps over state with the assigned array and assigns values to each dice */
  const diceValues = dice.map((dice) => {
    return (
      <Dice
        key={dice.id}
        diceProps={dice}
        holdDice={() => {
          holdDice(dice.id);
        }}
      />
    );
  });

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div id="dice-container">{diceValues}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
