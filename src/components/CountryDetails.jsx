import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { countryCodeToName } from "../countryCodeData";

const CountryDetails = ({ darkMode }) => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState({});
  const [countryCurrencies, setCountryCurrencies] = useState({});
  const currency = [];

  function capitalizeFirstLetter(string) {
    let country = string.replaceAll("-", " ");
    return country.charAt(0).toUpperCase() + country.slice(1);
  }

  useEffect(() => {
    async function getCountryData() {
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryName.replaceAll("-", " ")}`);
      setCountryData(data[0]);
      setCountryCurrencies(data[0].currencies);
    }
    getCountryData();

    document.title = `Countries | ${capitalizeFirstLetter(countryName)}`;
  }, [countryName]);

  for (const prop in countryCurrencies) {
    currency.push(countryCurrencies[prop].name);
  }

  return (
    <section className="max-w-[1400px] mx-auto py-12 px-6 flex flex-col gap-12 lg:gap-16">
      <Link
        to={"/"}
        className={`${
          darkMode ? "bg-darkBlue" : "bg-white"
        } flex items-center justify-center gap-2 shadow max-w-[8rem] py-2 px-2 rounded-md`}
      >
        <BsArrowLeft className="text-3xl" />
        Back
      </Link>
      <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div>
          <img className="w-full rounded shadow-xl" src={countryData?.flags?.svg} alt="" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-6">{countryData?.name?.common}</h2>
          <ul className="flex flex-col gap-2 mb-6">
            <li className="font-semibold">
              Population: <span className="font-normal">{countryData?.population?.toLocaleString()}</span>
            </li>
            <li className="font-semibold">
              Region: <span className="font-normal">{countryData?.region}</span>
            </li>
            <li className="font-semibold">
              Sub Region: <span className="font-normal">{countryData?.subregion}</span>
            </li>
            <li className="font-semibold">
              Capital: <span className="font-normal">{countryData?.capital}</span>
            </li>
            <li className="font-semibold">
              Currency:{" "}
              <span className="font-normal">{currency.map((item, index) => (index === 0 ? item : `, ${item}`))}</span>
            </li>
            <li className="font-semibold">
              Location:{" "}
              <a href={countryData?.maps?.googleMaps} target="_blank" className="font-normal underline">
                {countryData?.maps?.googleMaps}
              </a>
            </li>
            <li className="font-semibold">
              Top Level Domain: <span className="font-normal">{countryData?.tld?.[0]}</span>
            </li>
          </ul>
          {countryData?.borders ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">Border Countries</h3>

              <ul className="flex gap-2 flex-wrap">
                {countryData?.borders?.map((border, index) => (
                  <li
                    onClick={() => navigate(`/country/${countryCodeToName[border].toLowerCase().replaceAll(" ", "-")}`)}
                    key={index}
                    className={`${
                      darkMode ? "bg-darkBlue" : "bg-veryLightGray"
                    } shadow py-1 px-2 text-center cursor-pointer rounded-sm`}
                  >
                    {countryCodeToName[border]}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
    </section>
  );
};

export default CountryDetails;
