import React from "react";
import { Link } from "react-router-dom";

const CountryCart = ({ country, darkMode }) => {
  return (
    <Link
      to={`country/${country?.name?.common?.toLowerCase().replaceAll(" ", "-")}`}
      className={`mb-4 shadow-sm rounded-lg overflow-hidden ${darkMode ? "bg-darkBlue text-white" : "bg-white"}`}
    >
      <img src={country?.flags?.svg} className="w-full h-44 object-cover" alt="" />
      <div className={`${darkMode ? "text-white" : "text-veryDarkBlue"} p-6`}>
        <h3 className="text-lg font-semibold mb-2">{country?.name?.common}</h3>
        <p className="font-semibold text-sm mb-1">
          Population: <span className="font-[300]">{country?.population?.toLocaleString()}</span>
        </p>
        <p className="font-semibold text-sm mb-1">
          Region: <span className="font-[300]">{country?.region}</span>
        </p>
        <p className="font-semibold text-sm mb-1">
          Capital: <span className="font-[300]">{country?.capital}</span>
        </p>
      </div>
    </Link>
  );
};

export default CountryCart;
