import "../styles/Glass.css";
import { useState } from "react";
import axios from "axios";

function CropForm() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [temp, setTemp] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [humidity, setHumidity] = useState("");

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
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
        const mesg = `Our model suggests that you grow ${data.crop_type}`;
        alert(mesg);
        reset();
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const reset = () => {
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setPh("");
    setTemp("");
    setRainfall("");
    setHumidity("");
  };

  return (
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default CropForm;
