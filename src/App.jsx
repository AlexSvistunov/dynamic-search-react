import { useEffect, useState } from "react";
import ListElement from "./components/ListElement";
import "./App.css";
const URL =
  "https://gist.githubusercontent.com/VasilyMur/43ef6df83bba694f871f11a16ed7556d/raw/b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Error fetching data", response.status);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((el) =>
    el.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  function onChangeHandler(e) {
    setInputValue(e.target.value);
  }

  return (
    <>
      <input type="text" onChange={(e) => onChangeHandler(e)} />
      <ul className="list">
        {filteredData &&
          filteredData.map((el) => (
            <ListElement key={el.id} text={el.name}></ListElement>
          ))}
      </ul>

      <div>{inputValue}</div>
    </>
  );
}

//to-do list с localStorage, а вообще переписать все с useEffect

export default App;
