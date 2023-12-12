import React from 'react'
import { applicationType, applications, notepad, pinnedApps} from './applications/directory';
import { LuGrid} from "react-icons/lu";

type taskbarProps = {
    height: number;
    applications?:applicationType[];
    setActiveApplication?: (index: number) => void;
    activeApplicationId?: number;
    openApplication: (application: applicationType) => void;
}

function Taskbar({height, openApplication}: taskbarProps) {
  return (
    <div className='w-screen absolute bottom-0 flex flex-row items-center justify-center p-1' style={{height: height}}>
        <div className='backdrop-blur bg-gray-900/40 rounded-md px-8 h-full border border-gray-600 items-center flex flex-row space-x-2'>
          {pinnedApps.map((app, i) => {
            return <div className='hover:bg-gray-900/90 rounded-md p-1 cursor-pointer' onClick={() => openApplication(app)}>
              <app.icon className='w-10 h-10 stroke-gray-200 stroke-[1.5px]'/>
            </div>
          })}
        </div>
    </div>
  )
}

export default Taskbar