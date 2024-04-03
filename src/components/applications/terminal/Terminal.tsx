import React, { useState, useEffect, useCallback, useRef } from "react";
import { appComponentProps } from "../directory";
import { validInput, evaluateCommand } from "./TerminalUtils";
function Terminal({ focus }: appComponentProps) {
  const PATH = "AOS~";
  const [log, _setLog] = useState(["AOS 1.01"]);
  const logRef = useRef(log);
  const setLog = (data: string[]) => {
    logRef.current = data;
    _setLog(data);
  };
  const [text, _setText] = useState("");
  const textRef = useRef(text);
  const setText = (data: string) => {
    textRef.current = data;
    _setText(data);
  };
  const focusRef = useRef(focus);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  const cmdEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    cmdEndRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  };

  const submitCommand = () => {
    let cmd = PATH + textRef.current;
    let res = evaluateCommand(textRef.current);
    if (textRef.current === "") {
      setLog([...logRef.current, cmd]);
      return;
    }
    setLog([...logRef.current, cmd, ...res]);
  };

  const editText = (e: KeyboardEvent) => {
    if (!focusRef.current) return;

    const val = e.key;
    const curString = textRef.current;
    let newString = curString;
    if (val === "Enter") {
      submitCommand();
      setText("");
      //scrollToBottom();
      return;
    }
    if (val === "Backspace") {
      newString = curString.substring(0, curString.length - 1);
    } else {
      if (validInput(val)) {
        newString += val;
      }
      e.preventDefault();
    }
    setText(newString);
  };

  useEffect(() => {
    window.addEventListener("keydown", editText);
    return () => {
      window.removeEventListener("keydown", editText);
    };
  }, []);
  return (
    <div className="flex flex-col text-white text-sm font-mono p-2 h-full pb-96 overflow-y-scroll">
      <div className="flex flex-col">
        {log.map((item) => {
          return (
            <div className="flex flex-row">
              {item.split(/(\s)/).map((char, i) => {
                if (char === " ") {
                  return <div className="w-[8px]"></div>;
                }
                return <div>{char}</div>;
              })}
            </div>
          );
        })}
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap">
            <div>{PATH}</div>
            {text.split(/(\s)/).map((word, i) => {
              if (word === " ") {
                return <div className="w-2"></div>;
              }
              return <div>{word}</div>;
            })}
            {focus && <div className="w-2 bg-white h-4 blink"></div>}
          </div>
        </div>
        <div ref={cmdEndRef}></div>
      </div>
    </div>
  );
}

export default Terminal;
