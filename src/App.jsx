import Header from "./components/Header";
import Countries from "./components/Countries";
import Country from "./components/CountryDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={`${darkMode ? "bg-veryDarkBlue text-white" : "bg-veryLightGray"} min-h-screen`}>
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route exact path="/" element={<Countries darkMode={darkMode} />} />
          <Route path="/country/:countryName" element={<Country darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
