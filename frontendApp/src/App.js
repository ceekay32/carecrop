import React from "react";
import { Helmet } from "react-helmet";
// Screens
import Landing from "./screens/Landing.jsx";
import TopNavbar from "./components/Nav/TopNavbar.jsx";
import Header from "./components/Sections/Header.jsx";
import Services from "./components/Sections/Services.jsx";
import FertForm from "./screens/FertForm.jsx";
import CropForm from "./screens/CropForm.jsx";
import DiseaseForm from "./screens/DiseasesForm.jsx";
import PestiForm from "./screens/PestiForm.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* <Landing /> */}

      <Router>
        <TopNavbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Landing />} />{" "}
            {/* <Route path="/about" element={<About />} />
            <Route path="/market" element={<MarketInfo />} />
            <Route path="/weather" element={<WeatherInfo />} /> */}
            <Route path="/crop" element={<CropForm />} />
            <Route path="/fertilizer" element={<FertForm />} />
            <Route path="/disease" element={<DiseaseForm />} />
            <Route path="/pesticide" element={<PestiForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
