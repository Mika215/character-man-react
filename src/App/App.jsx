import {React, useState, useEffect} from "react";
import Characters from "../components/Characters";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from "../components/NavBar";
import SingleCharacter from "../components/SingleCharacter";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [smthChanged, setSmthChanged] = useState(false);

  //rendering all characters
  const listCharacters = async () => {
    const res = await fetch(process.env.REACT_APP_BECODE_URL);
    console.log();
    const data = await res.json([]);
    setSearchResult(data);
    setCharacters(data);
  };

  //Added State watchedog looks to changes
  const changeTrigered = () => {
    setSmthChanged(true);
  };

  //delete character
  const deleteChar = async (characterId) => {
    //TODO: Add a conirmation alert before user can delete characters
    await fetch(`${process.env.REACT_APP_BECODE_URL}/${characterId}`, {
      method: "DELETE",
    });

    console.log(characterId + "Deleted");
    setSmthChanged(true);
  };

  //search bar functionality

  const searchCharacter = (keyWord) => {
    const filtered = characters.filter((character) => {
      return character.name.toLowerCase().includes(keyWord.toLowerCase());
    });
    setOnSearch(true);
    setKeyWord(keyWord);
    setSearchResult(filtered);
    console.log(keyWord);
  };

  useEffect(() => {
    searchCharacter();
  }, []); //DO IT ONCE

  useEffect(() => {
    listCharacters();
  }, [smthChanged]); //DO IT EVERY TIME THE DEPENDANCE CHANGES

  return (
    <Router>
      <div className="App">
        <NavBar value={keyWord} handleChange={searchCharacter} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              {onSearch ? (
                <Characters characters={searchResult} delHandler={deleteChar} />
              ) : (
                <Characters characters={characters} delHandler={deleteChar} />
              )}
            </Route>
            <Route exact path="/single/:characterID">
              <SingleCharacter
                delHandler={deleteChar}
                characters={characters}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
