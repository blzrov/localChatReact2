import React from "react";
import Switch from "@mui/material/Switch";
import { settingsContext } from "../App";

export default function Chats({ messages, setSettings }) {
  const [checked, setChecked] = React.useState(false);
  const context = React.useContext(settingsContext);
  const rooms = Object.keys(messages);
  rooms.sort((a, b) => {
    const aDate = +messages[a][messages[a].length - 1].date;
    const bDate = +messages[b][messages[b].length - 1].date;
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="chats">
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <span>Чаты только с вашим участием to do</span>
      {rooms.length ? null : <h3>Тут будут чаты</h3>}
      <ul>
        {rooms.map((room) => {
          const lastMessage = messages[room][messages[room].length - 1];
          return (
            <li
              key={room}
              onClick={() => {
                if (context.user)
                  setSettings({ user: context.user, room: room });
              }}
              className={context.room === room ? "currentChat" : null}
            >
              <b>{room.length > 51 ? room.slice(0, 50) : room}</b>
              <br />
              <span className={context.user === lastMessage.user ? "" : "user"}>
                {context.user === lastMessage.user
                  ? "Вы: "
                  : lastMessage.user + ": "}
              </span>
              <span>
                {lastMessage.media
                  ? "Файл"
                  : lastMessage.value.length > 51
                  ? lastMessage.value.slice(0, 50)
                  : lastMessage.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
