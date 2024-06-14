import { IconType } from "react-icons";
import { LuPilcrowSquare, LuTerminalSquare, LuGrid } from "react-icons/lu";
import { TbBrandFlipboard, TbTerminal2, TbUser } from "react-icons/tb";

import Notepad from "./Notepad";
import Tetris from "./Tetris";
import Terminal from "./terminal/Terminal";
import About from "./about/About";
import Projects from "./about/Projects";

export type appComponentProps = {
  focus: boolean;
  openApp: (app: applicationType) => void;
  context?: any;
};

export type applicationType = {
  icon: IconType;
  component: React.FC<appComponentProps>;
  name: string;
  size?: "small" | "medium" | "fullscreen";
  focused?: boolean;
};

export const notepad: applicationType = {
  icon: LuPilcrowSquare,
  component: Notepad,
  name: "Notepad",
};

export const tetris: applicationType = {
  icon: TbBrandFlipboard,
  component: Tetris,
  name: "Tetris",
};

export const terminal: applicationType = {
  icon: TbTerminal2,
  component: Terminal,
  name: "Terminal",
};

export const about: applicationType = {
  icon: TbUser,
  component: About,
  name: "About",
  size: "medium",
};

export const projects: applicationType = {
  icon: TbUser,
  component: Projects,
  name: "Projects",
  size: "medium",
};

export const applications: applicationType[] = [
  notepad,
  tetris,
  about,
  notepad,
  projects,
  terminal,
];
export const pinnedApps: applicationType[] = [about, terminal, tetris, notepad];
