import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { settingsContext } from "../App";

export default function Settings({ setSettings }) {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");

  const context = useContext(settingsContext);
  useEffect(() => setRoom(context.room), [context]);

  // eslint-disable-next-line
  useEffect(() => setSettings({ user, room }), []);

  return (
    <div className="settings">
      <div>
        <TextField
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          label="Ваше имя"
          id="outlined-basic"
          variant="outlined"
          size="small"
          margin="dense"
        />
      </div>
      <div>
        <TextField
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          label="Комната"
          id="outlined-basic"
          variant="outlined"
          size="small"
          margin="dense"
        />
      </div>
      <div className="settingsButtons">
        <Button
          onClick={() => {
            setSettings({});
            if (user && room) {
              setSettings({ user, room });
              sessionStorage.setItem("user", user);
              sessionStorage.setItem("room", room);
            }
          }}
          variant="contained"
          size="small"
        >
          Подтвердить
        </Button>

        <Button
          onClick={() => {
            setUser("");
            setRoom("");
            setSettings({});
            sessionStorage.clear();
          }}
          variant="outlined"
          size="small"
          color="error"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
