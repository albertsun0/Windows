import { IconType } from "react-icons";
import { LuPilcrowSquare, LuTerminalSquare, LuGrid } from "react-icons/lu";
import { TbBrandFlipboard, TbTerminal2 } from "react-icons/tb";

import Notepad from "./Notepad";
import Tetris from "./Tetris";
import Terminal from "./terminal/Terminal";

export type appComponentProps = {
  focus: boolean;
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
export const applications: applicationType[] = [notepad, tetris];
export const pinnedApps: applicationType[] = [notepad, terminal, tetris];
