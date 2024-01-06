import React, { SetStateAction } from "react";
import Notepad from "./applications/Notepad";
import { applicationType } from "./applications/directory";

type windowStatus = "minimized" | "shown";

type windowProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  id: number;
  selectedId: number;
  select: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => void;
  app: applicationType;
  close: (id: number) => void;
  zIndex: number;
  focus: (id: number) => void;
};

function Window({
  left,
  top,
  width,
  height,
  id,
  select,
  app,
  close,
  zIndex,
  focus,
}: windowProps) {
  return (
    <div
      className={`absolute bg-gray-900/40 backdrop-blur rounded-lg overflow-hidden border-1 border-white`}
      style={{
        left: left,
        top: top,
        width: width,
        height: height,
        zIndex: zIndex,
      }}
      onMouseDown={(e) => focus(id)}
    >
      <div
        className="h-[20px] w-full  rounded-t-lg flex flex-row items-center px-2 space-x-2"
        onMouseDown={(e) => {
          select(e, id);
          e.stopPropagation();
        }}
      >
        <div
          className="h-3 w-3 bg-red-400 rounded-full hover:bg-red-600"
          onClick={() => close(id)}
        />
      </div>
      <app.component />
    </div>
  );
}

export default Window;
