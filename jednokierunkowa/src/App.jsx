// App.jsx
import React, { useState } from "react";
import {
  generateHash,
  bruteForceAttack,
  dictionaryAttack,
} from "./components/hash";

const App = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [bruteForceResult, setBruteForceResult] = useState(null);
  const [dictionaryResult, setDictionaryResult] = useState(null);

  const handleGenerateHash = () => {
    setHash(generateHash(input));
  };

  const handleBruteForceAttack = () => {
    setBruteForceResult(bruteForceAttack(hash, 8));
  };

  const handleDictionaryAttack = async () => {
    const result = await dictionaryAttack(hash);
    setDictionaryResult(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FUNKCJA JEDNOKIERUNKOWA</h1>
        <form>
          <label htmlFor="input">hasło:</label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" onClick={handleGenerateHash}>
            OK
          </button>
        </form>
        {hash && (
          <>
            <p>Hash: {hash}</p>
            <button type="button" onClick={handleBruteForceAttack}>
              Brute Force
            </button>
            <button type="button" onClick={handleDictionaryAttack}>
              Dictionary
            </button>

            {bruteForceResult && <p>Brute Force: {bruteForceResult}</p>}
            {dictionaryResult && <p>Dictionary: {dictionaryResult}</p>}
          </>
        )}
      </header>
    </div>
  );
};

export default App;
