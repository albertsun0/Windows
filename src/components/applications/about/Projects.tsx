import React from "react";
import slidebg from "../../../assets/slidesbg.gif";
import strssCal from "../../../assets/stresscal.gif";
import phutball from "../../../assets/phut.gif";
import bookshelf from "../../../assets/bookshelf.png";

const projects = [
  {
    name: "Slides Background",
    image: slidebg,
    description:
      "Generate beautiful material backgrounds for Google Slides presentations. Over 1 million users!",
    links: [
      "https://workspace.google.com/marketplace/app/slides_background/732310380877",
      "https://slides.doshy.org/",
      "https://github.com/Doshy-Org/Slides-Background",
    ],
    linkDescriptions: [
      "Available on the G Suite Marketplace",
      "Website",
      "Github",
    ],
    tags: ["Google Apps Script", "Google Cloud", "Javascript", "HTML/CSS"],
  },
  {
    name: "Bookshelf",
    image: bookshelf,
    description:
      "Create, share, and edit booklists with friends! View friends reading progress in real time.",
    links: [
      "https://bookshelf-kappa-two.vercel.app/",
      "https://github.com/nabil989/Bookshelf",
    ],
    linkDescriptions: ["Website", "Github"],
    tags: ["Next.js", "TailwindCSS", "MongoDB", "REST API", "Socket.io"],
  },
  {
    name: "Stress Calendar",
    image: strssCal,
    description:
      "A mood, stress tracking, and productivity application that records and analyzes feelings, and produces a stress based task list to help students coordinate and declutter their lives.",
    links: ["https://github.com/Doshy-Org/flutter-StressCalendar"],
    linkDescriptions: ["Github"],
    tags: ["Flutter", "Dart", "APIs"],
  },
  {
    name: "Phutball",
    image: phutball,
    description:
      "A modern take and mobile app implementation of the Philosopher's Football mathmatical and strategy board game.",
    links: ["https://github.com/Doshy-Org/Phutball"],
    linkDescriptions: ["Github"],
    tags: ["Flutter", "Dart"],
  },
];

function Projects() {
  return (
    <div className="p-4 text-white flex flex-col space-y-4 overflow-y-scroll h-full pb-10">
      <div className="text-lg font-semibold">Projects</div>
      {projects.map((project, i) => {
        return (
          <div className="flex flex-row space-x-4">
            <div className="w-1/4">
              <img src={project.image} className="rounded-sm"></img>
            </div>
            <div className="flex flex-col space-y-2 w-3/4">
              <div className="font-semibold">{project.name}</div>
              <div className="">{project.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Projects;
