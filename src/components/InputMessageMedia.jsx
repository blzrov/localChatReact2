import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { settingsContext } from "../App";

const exampleData = {
  audio: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  img: "https://sun3-10.userapi.com/impg/5ZHeMnCHMP7Fnv7UDjrqCfLSI0BxdnARjwBw5Q/3dOraKoMFzw.jpg?size=1080x1080&quality=95&sign=27d81a297d36ab6c2fa81dd2c239f4ba&type=album",
  video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
};

export default function InputMessageMedia({ send }) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("img");
  const [example, setExample] = useState(null);

  const context = useContext(settingsContext);
  React.useEffect(() => {
    setUrl("");
    setType("img");
    setExample(null);
  }, [context]);

  return (
    <div className="inputMessageMedia">
      <ToggleButtonGroup
        value={example}
        onChange={(e) => {
          setExample(e.target.value);
          setType(e.target.value);
          setUrl(exampleData[e.target.value]);
        }}
        color="primary"
        aria-label="Platform"
        exclusive
      >
        <ToggleButton value="audio">Пример</ToggleButton>
        <ToggleButton value="img">Пример</ToggleButton>
        <ToggleButton value="video">Пример</ToggleButton>
      </ToggleButtonGroup>

      <br />

      <ToggleButtonGroup
        value={type}
        onChange={(e) => {
          setExample(null);
          setType(e.target.value);
        }}
        color="primary"
        aria-label="Platform"
        exclusive
      >
        <ToggleButton value="audio">Аудио</ToggleButton>
        <ToggleButton value="img">Фото</ToggleButton>
        <ToggleButton value="video">Видео</ToggleButton>
      </ToggleButtonGroup>

      <br />

      <TextField
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        id="standard-basic"
        label="Вставьте URL"
        variant="standard"
        margin="normal"
      />

      <br />

      <Button
        disabled={!url}
        onClick={() => send(url, type)}
        variant="contained"
        color="success"
        size="small"
      >
        Отправить
      </Button>
    </div>
  );
}
