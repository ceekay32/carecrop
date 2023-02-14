import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import MarketInfo from "./pages/MarketInfo";
import WeatherInfo from "./pages/WeatherInfo";
import CropInfo from "./pages/CropInfo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/about" element={<About />} />
            <Route path="/market" element={<MarketInfo />} />
            <Route path="/weather" element={<WeatherInfo />} />
            <Route path="/crop  " element={<CropInfo />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
