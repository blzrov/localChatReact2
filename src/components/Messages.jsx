import React, { useState, useEffect, useRef, useContext } from "react";
import InputMessage from "./InputMessage";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { settingsContext } from "../App";

export default function Messages({ messages = [], sendMessage }) {
  const chatRef = useRef();
  const [quote, setQuote] = useState({});
  const context = useContext(settingsContext);

  useEffect(() => {
    setQuote({});
  }, [context]);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, quote]);

  return (
    <>
      <div className="chat" ref={chatRef}>
        {messages.length === 0 ? <h2>Напишите первым!</h2> : null}
        <ul>
          {messages.map((message, index) => {
            const isCurrentUser = context.user === message.user;
            const haveQuote = message.quote?.value && message.quote?.user;
            return (
              <li
                key={index}
                className={isCurrentUser ? "currentUserMessage" : null}
              >
                {haveQuote && (
                  <div>
                    <i className="tooltipI">В ответ: </i>
                    <Tooltip
                      arrow={true}
                      title={message.quote.value}
                      placement="top"
                    >
                      <Button className="tooltipButton" size="small">
                        <span className="tooltipName">
                          {message.quote.user}
                        </span>
                      </Button>
                    </Tooltip>
                  </div>
                )}
                {!isCurrentUser && (
                  <span className="name">{message.user}: </span>
                )}
                {message.media ? (
                  <message.media
                    width={200}
                    src={message.value}
                    alt=""
                    controls
                    onLoadedMetadata={() =>
                      (chatRef.current.scrollTop = chatRef.current.scrollHeight)
                    }
                  />
                ) : (
                  message.value
                )}
                <button
                  className="buttonQuote"
                  disabled={quote.value}
                  onClick={() => {
                    setQuote(message);
                  }}
                >
                  +
                </button>
              </li>
            );
          })}
          {quote.value && (
            <li className="inputMessageQuote">
              <i className="tooltipI">Ответить: </i>
              <Tooltip arrow={true} title={quote.value} placement="top">
                <Button className="tooltipButton" size="small">
                  <span className="tooltipName">{quote.user}</span>
                </Button>
              </Tooltip>
              <button className="buttonQuote" onClick={() => setQuote({})}>
                x
              </button>
            </li>
          )}
        </ul>
      </div>
      <InputMessage
        sendMessage={sendMessage}
        quote={quote}
        setQuote={setQuote}
      />
    </>
  );
}
