import React from "react";
import { settingsContext } from "../App";

export default function Chats(props) {
  const context = React.useContext(settingsContext);
  const data = Object.keys(props.data);
  data.sort((a, b) => {
    const aDate = +props.data[a][props.data[a].length - 1].date;
    const bDate = +props.data[b][props.data[b].length - 1].date;
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  });

  return (
    <div className="chats">
      {data.length ? null : "Тут будут чаты"}
      <ul className="Ulchats">
        {data.map((room) => {
          return (
            <li
              key={room}
              onClick={() =>
                props.setSettings({ user: context.user, room: room })
              }
            >
              {room}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
