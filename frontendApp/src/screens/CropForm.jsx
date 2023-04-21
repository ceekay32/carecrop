import "../style/Glass.css";
import { useState, useContext } from "react";
import axios from "axios";
import CropHistory from "../components/Sections/CropHistory";
import { CropContext } from "../context/CropContext";

function CropForm() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [temp, setTemp] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [humidity, setHumidity] = useState("");
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      nitrogen,
      phosphorus,
      potassium,
      ph,
      temp,
      rainfall,
      humidity,
    };
    axios
      .post("http://localhost:8080/predict_crop", params)
      .then((res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);

        const mesg = `Our model suggests that you grow ${data.crop_type}`;
        const crop = data.crop_type;
        setMessage(mesg);
        setSuccess(true);

        setHistory([
          ...history,
          {
            crop,
            nitrogen,
            phosphorus,
            potassium,
            ph,
            temp,
            rainfall,
            humidity,
          },
        ]);
        // reset();
      })
      .catch((error) => setMessage(`Error: ${error.message}`));
  };

  const handleReset = () => {
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setPh("");
    setTemp("");
    setRainfall("");
    setHumidity("");
  };
  return (
    <div>
      <div className="body-crop">
        <div className="glass">
          <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
            <h4>Crop Prediction</h4>
            <div className="glass__form__group">
              <input
                id="nitrogen"
                className="glass__form__input"
                placeholder="Enter Nitrogen value"
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
              <input
                id="bsc"
                className="glass__form__input"
                placeholder="Enter phosphorus value"
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
              <input
                id="workex"
                className="glass__form__input"
                placeholder="Enter Potassium value"
                required
                min="0"
                type="number"
                title="potassium value"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
              />
            </div>

            <div className="glass__form__group">
              <input
                id="etest_p"
                className="glass__form__input"
                placeholder="Enter ph value"
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
            </div>

            <div className="glass__form__group">
              <input
                id="msc"
                className="glass__form__input"
                placeholder="Enter temperature in Celsius"
                required
                min="0"
                type="number"
                title="Temperature in Celsius"
                pattern="[0-9]+([\.,][0-9]+)?"
                step="0.01"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
              />
            </div>
            <div className="glass__form__group">
              <input
                id="msc"
                className="glass__form__input"
                placeholder="Enter rainfall in cm"
                required
                min="0"
                type="number"
                title="rainfall in cm"
                pattern="[0-9]+([\.,][0-9]+)?"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </div>
            <div className="glass__form__group">
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
      <div className="history card">
        {history.length > 0 && (
          <div className="container">
            <h4>History</h4>
            {history.map((item, index) => (
              <p key={index}>
                <strong>Nitrogen:</strong> {item.nitrogen} <br />
                <strong>Phosphorus:</strong> {item.phosphorus} <br />
                <strong>Potassium:</strong> {item.potassium} <br />
                <strong>PH value:</strong> {item.ph} <br />
                <strong>Temperature:</strong> {item.temp} <br />
                <strong>Rainfall:</strong> {item.rainfall} <br />
                <strong>Humidtiy:</strong> {item.humidity} <br />
                <strong>Suggested crop:</strong> {item.crop}
                <br />
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropForm;
