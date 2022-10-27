import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.scss";
import Settings from "./components/Settings";
import Chats from "./components/Chats";
import Messages from "./components/Messages";

export const settingsContext = React.createContext({});

function App() {
  const [settings, setSettings] = useState({});
  const [data, setData] = useState([]);
  const dataRef = useRef();

  const getData = useCallback(async () => {
    dataRef.current = await JSON.parse(localStorage.getItem("data"));
    setData(dataRef.current);
  }, []);

  const saveData = () => {
    localStorage.setItem("data", JSON.stringify(dataRef.current));
    getData();
  };

  const sendMessage = (value, quote, media) => {
    if (!dataRef.current[settings.room]) {
      dataRef.current[settings.room] = [];
    }
    dataRef.current[settings.room].push({
      user: settings.user,
      value: value,
      quote: quote || null,
      media: media || null,
      date: Date.now(),
    });
    saveData();
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify({}));
    }
    getData();
    window.addEventListener("storage", getData);
    return () => window.removeEventListener("storage", getData);
  }, [getData]);

  return (
    <div className="App">
      <settingsContext.Provider value={settings}>
        <div className="left">
          <Settings setSettings={setSettings} />
          <Chats data={data} setSettings={setSettings} />
        </div>
        <div className="right">
          {settings.user && settings.room ? (
            <Messages
              messages={data[settings.room]}
              sendMessage={sendMessage}
            />
          ) : (
            <h2>Введите имя и комнату</h2>
          )}
        </div>
      </settingsContext.Provider>
    </div>
  );
}

export default App;
