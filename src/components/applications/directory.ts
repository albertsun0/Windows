import { IconType } from "react-icons";
import { LuPilcrowSquare, LuTerminalSquare, LuGrid } from "react-icons/lu";
import { TbBrandFlipboard } from "react-icons/tb";


import Notepad from "./Notepad";
import Tetris from "./Tetris";

export type applicationType = {
    icon: IconType;
    component: React.FC;
    name: string;
    size?: "small" | "medium" | "fullscreen";
}

export const notepad: applicationType = {
    icon: LuPilcrowSquare,
    component: Notepad,
    name: "Notepad"
}

export const terminal: applicationType = {
    icon: LuGrid,
    component: LuGrid,
    name: "Terminal"
}

export const tetris: applicationType = {
    icon: TbBrandFlipboard,
    component: Tetris,
    name: "Tetris"
}

export const applications: applicationType[] = [notepad, tetris];
export const pinnedApps: applicationType[] = [notepad, terminal, tetris];