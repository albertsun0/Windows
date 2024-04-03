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
    "_______________",
  ],
  about: ["AOS 1.01", ...logo],
};

const basicCommandsMap = new Map(Object.entries(basicCommands));

export const evaluateCommand = (input: string) => {
  if (basicCommandsMap.get(input) !== undefined) {
    return basicCommandsMap.get(input) || [];
  }
  return ["Command not recognized"];
};
