import React from "react";
import {
  applicationType,
  applications,
  notepad,
  pinnedApps,
} from "./applications/directory";
import { TbGridDots } from "react-icons/tb";
import { IconType } from "react-icons";

type taskbarProps = {
  height: number;
  applications?: applicationType[];
  setActiveApplication?: (index: number) => void;
  activeApplicationId?: number;
  openApplication: (application: applicationType) => void;
};

type taskbarItemProps = {
  Icon: IconType;
  onClick: () => void;
};

function TaskBarItem({ Icon, onClick }: taskbarItemProps) {
  return (
    <div
      className="hover:bg-gray-900/90 rounded-md p-1 cursor-pointer bg-gray-800 after:bg-black"
      onClick={onClick}
    >
      <Icon className="w-8 h-8 stroke-gray-200 stroke-[1.5px]" />
    </div>
  );
}

function Taskbar({ height, openApplication }: taskbarProps) {
  return (
    <div
      className="w-screen absolute bottom-0 flex flex-row items-center justify-center p-1"
      style={{ height: height }}
    >
      <div className="backdrop-blur bg-gray-900/60 rounded-md px-4 h-full items-center flex flex-row space-x-2">
        {/* <TaskBarItem onClick={() => {}} Icon={TbGridDots} /> */}
        {pinnedApps.map((app, i) => {
          return (
            <TaskBarItem onClick={() => openApplication(app)} Icon={app.icon} />
          );
        })}
      </div>
    </div>
  );
}

export default Taskbar;
