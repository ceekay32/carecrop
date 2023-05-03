import "../style/Glass.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

function FertForm() {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soil, setSoil] = useState();
  const [crop, setCrop] = useState();
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState([]);
  const [city, setCity] = useState("");

  const [fertilizer, setFertilizer] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const soilTypes = {
    Sandy: 0,
    Loamy: 1,
    Black: 2,
    Red: 3,
    Clayey: 4,
  };

  const cropTypes = {
    Maize: 0,
    Sugarcane: 1,
    Cotton: 2,
    Tobacco: 3,
    Paddy: 4,
    Barley: 5,
    Wheat: 6,
    Millets: 7,
    "Oil seeds": 8,
    Pulses: 9,
    "Ground Nuts": 10,
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // const handleCountryChange = (event) => {
  //   setCountry(event.target.value);
  // };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city) {
      axios
        .get(url)
        .then((res) => {
          setTemp(res.data.main.temp);
          setHumidity(res.data.main.humidity);
          setMessage("");
        })
        .catch((error) => setMessage(`Error: ${error.message}`));
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormSubmitted(true);
    const params = {
      temp,
      humidity,
      moisture,
      soil: soilTypes[soil],
      crop: cropTypes[crop],
      nitrogen,
      potassium,
      phosphorus,
    };

    axios
      .post("http://localhost:8080/predict_fert", params)
      .then((res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);
        const mesg = `Our model suggests that you use ${data.fertilizer} as your <fertilizer></fertilizer>`;
        const fert = data.fertilizer;
        setMessage(mesg);
        setSuccess(true);

        setHistory([
          ...history,
          {
            fert,
            temp,
            humidity,
            moisture,
            soil,
            crop,
            nitrogen,
            potassium,
            phosphorus,
          },
        ]);
        // reset();
      })
      .catch((error) => setMessage(`Error: ${error.message}`));
  };

  const handleReset = () => {
    setTemp("");
    setHumidity("");
    setMoisture("");
    setSoil("");
    setCrop("");
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setCity("");
  };

  return (
    <div style={{ backgroundColor: "#70a062" }}>
      <div className="body-crop">
        <div className="glass">
          <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
            <h4>Fertilizer Suggestion</h4>
            <br />
            <br />
            Enter Nitrogen value
            <div className="glass__form__group">
              <input
                id="nitrogen"
                className="glass__form__input"
                placeholder=""
                required
                autoFocus
                min="0"
                pattern="[0-9]{0,1}"
                title="Nitrogen value"
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(e.target.value)}
              />
            </div>
            <div className="glass__form__group">
              Enter phosphorus value
              <input
                id="bsc"
                className="glass__form__input"
                placeholder=""
                required
                min="0"
                type="number"
                title="phosphorus value"
                pattern="[0-9]+([\.,][0-9]+)?"
                value={phosphorus}
                onChange={(e) => setPhosphorus(e.target.value)}
              />
            </div>
            <div className="glass__form__group">
              Enter Potassium value
              <input
                id="workex"
                className="glass__form__input"
                placeholder=""
                required
                min="0"
                type="number"
                title="potassium value"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
              />
            </div>
            {/* <div className="glass__form__group">
              Enter ph value
              <input
                id="etest_p"
                className="glass__form__input"
                placeholder=""
                required
                min="0"
                max="14"
                type="number"
                title="ph value"
                pattern="[0-9]+([\.,][0-9]+)?"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />
            </div> */}
            {/* <div className="glass__form__group">
              <input
                id="msc"
                className="glass__form__input"
                placeholder="Enter temperature in Celsius"
                required
                min="0"
                type="number"
                title="Temperature in Celsius"
                pattern="[0-9]+([\.,][0-9]+)?"
                step="1"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
              />
            </div> */}
            <div className="glass__form__group">
              Enter moisture level
              <input
                id="msc"
                className="glass__form__input"
                placeholder=""
                required
                min="0"
                type="number"
                title="moisture"
                pattern="[0-9]+([\.,][0-9]+)?"
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
              />
            </div>
            {/* <div className="glass__form__group">
              <input
                id="msc"
                className="glass__form__input"
                placeholder="Enter % of humidity"
                required
                min="0"
                type="number"
                title="Enter humidity"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
              />
            </div> */}
            {/* <div className="glass__form__group">
              <input
                id="msc"
                className="glass__form__input"
                placeholder="Enter Country"
                required
                type="text"
                title="Enter Country"
                value={country}
                // onChange={(e) => setCountry(e.target.value)}
                onChange={handleCountryChange}
              />
            </div> */}
            <div className="glass__form__group">
              Enter crop
              <br></br>
              <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                <option value="">--Select Crop--</option>
                <option value="Maize">Maize</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Cotton">Cotton</option>
                <option value="Tobacco">Tobacco</option>
                <option value="Paddy">Paddy</option>
                <option value="Barley">Barley</option>
                <option value="Wheat">Wheat</option>
                <option value="Millets">Millets</option>
                <option value="Oil seeds">Oil seeds</option>
                <option value="Pulses">Pulses</option>
                <option value="Ground Nuts">Ground Nuts</option>
              </select>
            </div>
            <div className="glass__form__group">
              Enter soil
              <br></br>
              <select value={soil} onChange={(e) => setSoil(e.target.value)}>
                <option value="">--Select Soil--</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Clayey">Clayey</option>
              </select>
            </div>
            <div className="glass__form__group">
              Enter city
              <input
                id="msc"
                className="glass__form__input"
                placeholder=""
                required
                type="text"
                title="Enter city"
                value={city}
                // onChange={(e) => setCity(e.target.value)}
                onChange={handleCityChange}
              />
            </div>
            <div className="glass__form__group">
              <button type="submit" className="glass__form__btn">
                Submit
              </button>
              {message && <p>{message}</p>}
            </div>
          </form>

          {success && (
            <div>
              <button
                onClick={handleReset}
                className="glass__form__btn_secondary"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="history card" style={{ backgroundColor: "#70a062" }}>
        {history.length > 0 && (
          <div className="container">
            <h4>History</h4>
            {history.reverse().map((item, index) => (
              <div key={index} className="card">
                <p>
                  <strong>Nitrogen:</strong> {item.nitrogen} <br />
                  <strong>Phosphorus:</strong> {item.phosphorus} <br />
                  <strong>Potassium:</strong> {item.potassium} <br />
                  <strong>Moisture</strong> {item.moisture} <br />
                  <strong>Temperature:</strong> {item.temp} <br />
                  <strong>Crop Type:</strong> {item.crop} <br />
                  <strong>Soil Type:</strong> {item.soil} <br />
                  <strong>Humidity:</strong> {item.humidity} <br />
                  <strong>Suggested fertilizer:</strong> {item.fert}
                  <br />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FertForm;
