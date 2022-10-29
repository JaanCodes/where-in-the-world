import axios from "axios";
import React, { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import CountryCard from "../UI/CountryCard";

const Countries = ({ darkMode }) => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const codeToCountryMap = new Map();

  useEffect(() => {
    async function getCountriesData() {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      data.map((country) => codeToCountryMap.set(country.cca3, country.name.common));
      const countriesSliced = data.sort(() => 0.5 - Math.random()).slice(0, 16);
      setCountries(countriesSliced);
    }
    getCountriesData();

    document.title = "Rest Countries API";
  }, []);

  async function getSearchCountryData() {
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${searchCountry}`);
    setCountries(data);
  }

  useEffect(() => {
    if (selectedRegion) {
      async function getSelectedRegionData() {
        const { data } = await axios.get(`https://restcountries.com/v3.1/region/${selectedRegion}`);
        const countriesSorted = data.sort(() => 0.5 - Math.random());
        setCountries(countriesSorted);
      }
      getSelectedRegionData();
    }
  }, [selectedRegion]);

  return (
    <main className="max-w-[1400px] mx-auto py-12 px-6 ">
      <article className="flex items-center justify-between gap-2">
        <label className="relative" htmlFor="searchInput">
          <SlMagnifier
            onClick={getSearchCountryData}
            className="absolute top-4 left-3 md:top-4 md:left-3 lg:left-4 text-lg cursor-pointer"
          />
          <input
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getSearchCountryData()}
            name="searchInput"
            type="text"
            autoComplete="off"
            className={`${
              darkMode
                ? "bg-darkBlue text-white placeholder:text-white"
                : "bg-white text-darkBlue placeholder:text-darkBlue"
            } rounded-md py-4 pl-10 lg:pl-12 pr-4 w-full text-sm outline-none shadow`}
            placeholder="Search for a country..."
          />
        </label>
        <select
          onChange={(e) => setSelectedRegion(e.target.value)}
          name="selectInput"
          defaultValue="Default"
          className={`${
            darkMode
              ? "bg-darkBlue text-white placeholder:text-white"
              : "bg-white text-darkBlue placeholder:text-darkBlue"
          } rounded-md p-4 text-sm outline-none shadow`}
        >
          <option value="Default" disabled>
            Filter by Region
          </option>
          <option value="Africa" className="px-6">
            Africa
          </option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
        {countries.map((country, index) => (
          <CountryCard key={index} country={country} darkMode={darkMode} />
        ))}
      </article>
    </main>
  );
};

export default Countries;
