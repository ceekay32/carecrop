import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import MarketInfo from "./pages/MarketInfo";
import WeatherInfo from "./pages/WeatherInfo";
import CropInfo from "./pages/CropInfo";
import CropForm from "./components/CropForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import DiseasePredictionForm from "./components/DiseasePredForm";

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
            <Route path="/crop" element={<CropForm />} />
            <Route path="/disease" element={<DiseasePredictionForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
