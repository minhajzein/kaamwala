import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMan, IoRestaurant, IoSettings } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosMan } from "react-icons/io";

const SidebarData = [
  { name: "Dashboard", icon: GoHomeFill, path: "/areamanager/", color: "bg-gray-500" },
  { name: "Restaurant", icon: IoRestaurant, path: "/areamanager/restaurant", color: "bg-red-500" },
  { name: "employee", icon: IoMan, path: "/areamanager/employee", color: "bg-green-500" },
  { name: "Settings", icon: IoSettings, path: "/areamanager/settings", color: "bg-violet-500" },
];

const AreaManagerSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen transition-all duration-300 ${isOpen ? 'w-52' : 'w-14'} text-white opacity-90  bg-black`}>
      <div className="flex flex-col h-full shadow-lg pt-4">
        <div className="flex items-center pl-5 p-3 ">
          {isOpen && <div className={`text-[1.5rem] flex items-center    gap-3   font-mono transition-all duration-300 font-extrabold  ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Kaam Waala</div>}
          <div className={`text-[1.2rem] flex font-mono transition-all duration-300 font-extrabold  ${isOpen ? 'opacity-0' : 'opacity-100'}`}>KM</div>
        </div>
         <div className="flex w-full h-[.1px] bg-zinc-300"></div>
        <div className="flex-grow mt-2  no-scrollbar">
          {SidebarData.map((data, i) => {
            const Icon = data.icon;
            const itemColor = isActive(data.path) ? "rounded-md  bg-gray-50 " : "hover:bg-gray-100 text-gray-800 rounded-md";
            const iconColor = isActive(data.path) ? "text-gray-900" : "";

            return (
              <div key={i} className={`  transition duration-300 ease-in-out mx-2 py-[2px]`}>
                <div onClick={() => navigate(data.path)} className={`flex  justify-between items-center cursor-pointer  p-2 text-white hover:text-gray-700 ${itemColor}`}>
                  <div className={`flex gap-3 text-sm font-medium items-center `}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                    {isOpen && <div className={` ${iconColor}`}>{data.name}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" p-3">
      
              <div className="flex items-center justify-end">
               {isOpen && <div className="text-[.6rem] font-thin flex justify-end w-full mr-5">Kaamwaala version 0.1</div> }
              
                  <button onClick={toggleSidebar} className="ml-auto text-[.6rem] cursor-pointer text-gray-200 p-2">
          {isOpen ? <IoIosArrowDropleftCircle className="h-5 w-5" /> : <IoIosArrowDroprightCircle className="h-5 w-5 " />}
        </button>
      
              </div>
         
        </div>
      </div>
    </div>
  );
};

export default AreaManagerSidebar;
