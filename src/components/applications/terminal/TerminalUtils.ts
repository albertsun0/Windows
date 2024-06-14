import { applicationType, applications } from "../directory";
export const validInput = (input: string) => {
  return input.length === 1;
};

const logo = [
  "     ___           ___           ___     ",
  "    /\\  \\         /\\  \\         /\\  \\    ",
  "   /::\\  \\       /::\\  \\       /::\\  \\   ",
  "  /:/\\:\\  \\     /:/\\:\\  \\     /:/\\ \\  \\  ",
  " /::\\~\\:\\  \\   /:/  \\:\\  \\   _\\:\\~\\ \\  \\ ",
  "/:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /\\ \\:\\ \\ \\__\\",
  "\\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\ \\:\\ \\/__/",
  "     \\::/  /   \\:\\  /:/  /   \\:\\ \\:\\__\\  ",
  "     /:/  /     \\:\\/:/  /     \\:\\/:/  /  ",
  "    /:/  /       \\::/  /       \\::/  /   ",
  "    \\/__/         \\/__/         \\/__/    ",
];

const basicCommands = {
  hello: ["hello"],
  hi: ["hello"],
  help: [
    "HELP",
    "_______________",
    "hi: greetings",
    "about: about AOS",
    "open [app name]: open an application try 'about'",
    "_______________",
  ],
  about: ["AOS 1.01", ...logo],
};

const basicCommandsMap = new Map(Object.entries(basicCommands));

export const evaluateCommand = (
  input: string,
  openApp: (app: applicationType) => void
) => {
  if (basicCommandsMap.get(input) !== undefined) {
    return basicCommandsMap.get(input) || [];
  }
  const sp = input.split(" ");
  if (sp.length < 1) {
    return ["Invalid input"];
  }
  if (sp[0] === "open") {
    if (sp.length !== 2) {
      return ["Please include application name"];
    }
    for (var i = 0; i < applications.length; i++) {
      console.log(applications[i].name.toLowerCase(), sp[1].toLowerCase());
      if (applications[i].name.toLowerCase() === sp[1].toLowerCase()) {
        openApp(applications[i]);
        return ["Success"];
      }
    }
    return ["App not found"];
  }
  return ["Command not recognized"];
};
