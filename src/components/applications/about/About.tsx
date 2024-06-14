import React from "react";
import { LuGithub } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { appComponentProps } from "../directory";
import { projects } from "../directory";

const openGithub = () => window.open("https://github.com/albertsun0", "_blank");
const openLinkedIn = () =>
  window.open("https://www.linkedin.com/in/albertsun0/", "_blank");

function About({ openApp }: appComponentProps) {
  const links = [
    {
      name: "Projects",
      icon: FiBox,
      action: null,
      app: projects,
    },
    {
      name: "Resume",
      icon: FiFileText,
      action: openLinkedIn,
      app: null,
    },
    {
      name: "Github",
      icon: LuGithub,
      action: openGithub,
    },
    {
      name: "LinkedIn",
      icon: LuLinkedin,
      action: openLinkedIn,
    },
  ];

  return (
    <div className="p-2 w-full h-full flex flex-col text-white font-mono space-y-6 items-center py-10 text-center">
      <div className="text-3xl font-semibold">Hi, I'm Albert</div>
      <div className="">
        I'm a CS student at UT Austin who loves game development, human centered
        computing, and frontend development.
      </div>
      <div className="">Welcome to AOS</div>
      <div className="grid grid-cols-4 gap-4">
        {links.map((item, i) => {
          return (
            <div
              className="flex flex-col hover:cursor-pointer items-center space-y-2 border hover:border-gray-700 border-transparent rounded-md p-2 hover:bg-slate-50/5"
              onClick={() => {
                if (item.action) {
                  return item.action();
                }
                if (item.app) {
                  openApp(item.app);
                }
              }}
            >
              <item.icon size={20} />
              <div className="text-xs">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
