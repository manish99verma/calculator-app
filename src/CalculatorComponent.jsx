import ic_cross from "./assets/icons/ic_cross.svg";
import ic_divide from "./assets/icons/ic_divide.svg";
import ic_equal_btn from "./assets/icons/ic_equal_btn.svg";
import ic_equal_output from "./assets/icons/ic_equal_output.svg";
import ic_minus from "./assets/icons/ic_minus.svg";
import ic_plus_minus from "./assets/icons/ic_plus_minus.svg";
import ic_percent from "./assets/icons/ic_percent.svg";
import ic_plus from "./assets/icons/ic_plus.svg";

import React, { useState, useEffect } from "react";

// Import specific functions
import { sqrt, evaluate, re } from "mathjs";

// Create a math.js instance
import { create, all } from "mathjs";

function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [output, setOutput] = useState("0");

  function clearAll() {
    setCalculation("");
    refreshOutput("");
  }

  function clear() {
    setCalculation("");
  }

  function equalBtnClick() {
    setCalculation(output);
    setOutput(output);
  }

  function appendInput(input) {
    setCalculation((c) => {
      const temp = c === "0" ? input : c + input;
      refreshOutput(temp);
      return temp;
    });
  }

  function appendMathSymbols(input) {
    setCalculation((c) => {
      if (
        c.length >= 3 &&
        c[c.length - 1] == " " &&
        !isNaN(c[c.length - 2] == "+")
      ) {
        c = c.substring(0, c.length - 3);
      }

      return c + " " + input + " ";
    });
  }

  function refreshOutput(equation) {
    setOutput((prev) => {
      if (equation.length == 0) {
        return "0";
      }

      try {
        return evaluate(equation);
      } catch (e) {
        console.log(e.message);
      }
      return prev;
    });
  }

  function appendDot() {
    setCalculation((c) => {
      return c + ".";
    });
  }

  return (
    <div className="container">
      <div className="input_container">
        <span className="input-text">{calculation} </span>
      </div>

      <div className="output-box">
        <img className="equal-icon" src={ic_equal_output} alt="equal-text" />
        <span className="output-text">{output}</span>
      </div>

      <div className="buttons-container">
        <button className="clear-all-btn" onClick={clearAll}>
          CE
        </button>
        <button onClick={clear}>C</button>
        <button onClick={() => appendMathSymbols("%")}>
          <img src={ic_percent} />
        </button>
        <button className="button-dark" onClick={() => appendMathSymbols("/")}>
          <img src={ic_divide} />
        </button>
        <button onClick={() => appendInput("7")}>7</button>
        <button onClick={() => appendInput("8")}>8</button>
        <button onClick={() => appendInput("9")}>9</button>
        <button className="button-dark" onClick={() => appendMathSymbols("*")}>
          <img src={ic_cross} />
        </button>
        <button onClick={() => appendInput("4")}>4</button>
        <button onClick={() => appendInput("5")}>5</button>
        <button onClick={() => appendInput("6")}>6</button>
        <button className="button-dark" onClick={() => appendMathSymbols("-")}>
          <img src={ic_minus} />
        </button>
        <button onClick={() => appendInput("1")}>1</button>
        <button onClick={() => appendInput("2")}>2</button>
        <button onClick={() => appendInput("3")}>3</button>
        <button className="button-dark" onClick={() => appendMathSymbols("+")}>
          <img src={ic_plus} />
        </button>
        <button>
          <img src={ic_plus_minus} />
        </button>
        <button onClick={() => appendInput("0")}>0</button>
        <button onClick={appendDot}>.</button>
        <button className="button-light" onClick={equalBtnClick}>
          <img src={ic_equal_btn} />
        </button>
      </div>
    </div>
  );
}

export default Calculator;
