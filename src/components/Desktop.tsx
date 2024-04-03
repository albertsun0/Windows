import React from "react";
import Window from "./Window";
import { useState, useEffect, useRef } from "react";
import Taskbar from "./Taskbar";
import { applications, applicationType } from "./applications/directory";
import { notepad } from "./applications/directory";
type window = {
  left: number;
  top: number;
  width: number;
  height: number;
  zindex: number;
  app: applicationType;
  id: number;
};

type point = {
  x: number;
  y: number;
};

const desktopWidth = document.documentElement.clientWidth;
const desktopHeight = document.documentElement.clientHeight;
const taskbarHeight = 60;

function Desktop() {
  const [selectID, _setSelectID] = useState(-1);
  const [windows, _setWindows] = useState<window[]>([]);
  const [selectOffset, _setSelectOffset] = useState<point>({ x: 0, y: 0 });
  const windowsRef = React.useRef(windows);
  const selectedIDRef = React.useRef(selectID);
  const selectOffsetRef = React.useRef(selectOffset);

  const [nextID, _setnextID] = useState(1);
  const nextIDRef = React.useRef(nextID);
  const setnextID = (data: number) => {
    nextIDRef.current = data;
    _setnextID(data);
  };

  const [nextZIndex, _setnextZIndex] = useState(1);
  const nextZIndexRef = React.useRef(nextZIndex);
  const setnextZIndex = (data: number) => {
    nextZIndexRef.current = data;
    _setnextZIndex(data);
  };

  const setWindows = (data: window[]) => {
    windowsRef.current = data;
    _setWindows(data);
  };
  const setSelectID = (data: number) => {
    selectedIDRef.current = data;
    _setSelectID(data);
  };
  const setSelectOffset = (data: point) => {
    selectOffsetRef.current = data;
    _setSelectOffset(data);
  };

  const [focusedWindow, setFocusedWindow] = useState(-1);

  const mouseDown = (e: MouseEvent) => {};

  const focusWindow = (i: number) => {
    const newWindows: window[] = windowsRef.current.map((window) => {
      if (window.id === i) {
        return { ...window, zindex: nextZIndexRef.current + 1 };
      }
      return window;
    });
    setWindows(newWindows);
    setnextZIndex(nextZIndexRef.current + 1);
    setFocusedWindow(i);
  };

  const setDragWindow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number
  ) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const index = windows.findIndex((window) => {
      return window.id === i;
    });
    const offsetX = mouseX - windows[index].left;
    const offsetY = mouseY - windows[index].top;
    setSelectOffset({ x: offsetX, y: offsetY });
    focusWindow(i);
    setSelectID(i);
  };

  const mouseUp = (e: MouseEvent) => {
    e.preventDefault();
    console.log("mouseup");
    setSelectID(-1);
  };

  const mouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (selectedIDRef.current !== -1) {
      const newWindows: window[] = windowsRef.current.map((window) => {
        if (window.id === selectedIDRef.current) {
          let l = Math.min(
            e.x - selectOffsetRef.current.x,
            desktopWidth - window.width
          );
          let t = Math.min(
            e.y - selectOffsetRef.current.y,
            desktopHeight - window.height - taskbarHeight
          );
          l = Math.max(l, 0);
          t = Math.max(t, 0);
          return { ...window, left: l, top: t };
        }
        return window;
      });
      setWindows(newWindows);
    }
  };

  const openApplication = (app: applicationType) => {
    const newWindow: window = {
      left: 0,
      top: 0,
      width: 500,
      height: 400,
      zindex: nextZIndexRef.current,
      app: app,
      id: nextIDRef.current,
    };
    setnextID(nextIDRef.current + 1);
    setnextZIndex(nextZIndexRef.current + 1);
    const newWindows: window[] = [...windowsRef.current, newWindow];
    setWindows(newWindows);
    focusWindow(newWindow.id);
  };

  const closeApplication = (id: number) => {
    console.log("close", windows, id);
    const newWindows: window[] = windowsRef.current.filter(
      (window) => window.id !== id
    );
    console.log("newWindows", newWindows);
    setWindows(newWindows);
  };

  useEffect(() => {
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-950 to-fuchsia-950 overflow-hidden">
      {windows.map((currentWindow) => {
        return (
          <Window
            isFocused={currentWindow.id === focusedWindow}
            left={currentWindow.left}
            top={currentWindow.top}
            width={currentWindow.width}
            height={currentWindow.height}
            id={currentWindow.id}
            selectedId={selectID}
            select={setDragWindow}
            app={currentWindow.app}
            close={closeApplication}
            zIndex={currentWindow.zindex}
            key={currentWindow.id}
            focus={focusWindow}
          />
        );
      })}
      <Taskbar height={taskbarHeight} openApplication={openApplication} />
    </div>
  );
}

export default Desktop;

/*
    How to handle windows
    on mouse down - find top window that it is overlapping, move it to top of the window array
    if continued mouse down - transform window based on mouse offset from original position
    on mouse up - save state
*/
