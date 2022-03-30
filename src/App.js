import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

const App = () => {

  const [adaPrice, setAdaPrice] = useState({});
  const [input, setInput] = useState("");
  const [dollars, setDollars] = useState("0.00");

  const calculatePrice = (e) => {
    e.persist();
    setInput(e.target.value)
    console.log(dollars)
  };

async function fetchPrice() {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd");
    res
      .json()
      .then(res => setAdaPrice(res))
      .then(console.log(adaPrice))
}

useEffect(() => {
  fetchPrice()
}, [])

useEffect(() => {
    console.log("Input inside UseEffect: ", input, adaPrice)
    if (adaPrice.cardano?.usd) {
setDollars((adaPrice.cardano.usd * input).toFixed(2))
}

    
  }, [input]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a super simple app to practice fetching data from coingecko and using it to calculate price.
        </p>
         <span>Price of Cardano in ${dollars}</span>
         <input
         name="item"
         type="number"
         placeholder="Add ADA"
         value={input}
         onChange={(e) => calculatePrice(e)}
         ></input>
        
      </header>
      <span>${dollars}</span>
    </div>
  );
}

export default App;
