import React from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <header className={darkMode ? "bg-darkBlue text-white" : "bg-white"}>
      <header className="flex items-center max-w-[1400px] mx-auto px-6 py-6">
        <h1 className="font-bold text-xl md:text-2xl capitalize mr-auto">Where in the world</h1>
        <div
          className="flex items-center cursor-pointer gap-2 font-semibold select-none	"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <>
              <BsFillSunFill className="text-[22px]" /> <span>Light Mode</span>
            </>
          ) : (
            <>
              <BsFillMoonFill className="text-[22px]" /> <span>Dark Mode</span>
            </>
          )}
        </div>
      </header>
    </header>
  );
};

export default Navbar;
