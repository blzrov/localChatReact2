import React, { useState, useEffect, useRef, useContext } from "react";
import InputMessage from "./InputMessage";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { settingsContext } from "../App";

export default function Messages({ messages = [], sendMessage }) {
  const ulRef = useRef();
  const [quote, setQuote] = useState({});
  const context = useContext(settingsContext);

  useEffect(() => {
    setQuote({});
  }, [context]);

  useEffect(() => {
    if (!ulRef.current) return;
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  }, [messages, quote]);

  return (
    <>
      <div className="messages">messages</div>
      <InputMessage
        sendMessage={sendMessage}
        quote={quote}
        setQuote={setQuote}
      />
    </>
  );
}
