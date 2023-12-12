import { IconType  } from "react-icons";
import { LuPilcrowSquare, LuTerminalSquare, LuGrid} from "react-icons/lu";

import Notepad from "./Notepad";

export type applicationType = {
    icon:  IconType;
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

export const applications:applicationType[] = [notepad];
export const pinnedApps:applicationType[] = [notepad, terminal];