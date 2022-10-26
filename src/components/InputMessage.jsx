import React, { useState, useContext } from "react";
import Media from "./InputMessageMedia";
import EmojiPicker from "emoji-picker-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { settingsContext } from "../App";

export default function InputMessage({ sendMessage, quote, setQuote }) {
  const [value, setValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const context = useContext(settingsContext);
  React.useEffect(() => setValue(""), [context]);

  const send = (inputMedia, media) => {
    inputMedia && media
      ? sendMessage(inputMedia, quote, media)
      : sendMessage(value, quote, null);

    setValue("");
    setIsEmojiOpen(false);
    setIsMediaOpen(false);
    setQuote({});
  };

  return (
    <div className="inputMessage">
      <div>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value) {
              send();
            }
          }}
          placeholder="Введите сообщение..."
          hiddenLabel
          id="filled-basic"
          variant="filled"
          size="small"
        />
        <Button
          disabled={!value}
          onClick={send}
          variant="contained"
          size="small"
          color="success"
        >
          Отправить
        </Button>
      </div>

      <div>
        <Button
          onClick={() => {
            if (isEmojiOpen) {
              setIsEmojiOpen(false);
              return;
            }
            setIsEmojiOpen(true);
            setIsMediaOpen(false);
          }}
          variant="contained"
          color="secondary"
          size="small"
        >
          Emoji
        </Button>

        <Button
          onClick={() => {
            if (isMediaOpen) {
              setIsMediaOpen(false);
              return;
            }
            setIsMediaOpen(true);
            setIsEmojiOpen(false);
          }}
          variant="contained"
          color="secondary"
          size="small"
        >
          Медиа
        </Button>
      </div>

      <div className="wrapperMedia">
        {isMediaOpen && <Media send={send} />}
        {isEmojiOpen && (
          <EmojiPicker
            lazyLoadEmojis={true}
            skinTonesDisabled={true}
            searchDisabled={true}
            onEmojiClick={(e) => setValue(value + e.emoji)}
          />
        )}
      </div>
    </div>
  );
}
