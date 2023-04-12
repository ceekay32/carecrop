import "../styles/Glass.css";
import { useState } from "react";
import axios from "axios";

function FertForm() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temp, setTemp] = useState("");
  const [moisture, setMoisture] = useState("");
  const [humidity, setHumidity] = useState("");
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      nitrogen,
      phosphorus,
      potassium,
      temp,
      moisture,
      humidity,
      soil,
      crop,
    };

    axios
      .post("http://localhost:8080/predict_fert", params)
      .then((res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
        const mesg = `Our model suggests that you grow ${data.fert_type}`;
        alert(mesg);
        reset();
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const reset = () => {
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setTemp("");
    setMoisture("");
    setHumidity("");
    setCrop("");
    setSoil("");
  };

  return (
    <div className="body-crop">
      <div className="glass">
        <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
          <h4>Fertilizer Prediction</h4>
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
              placeholder="Enter moisture value"
              required
              min="0"
              max="14"
              type="number"
              title="moisture value"
              pattern="[0-9]+([\.,][0-9]+)?"
              step="0.1"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
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
              placeholder="Enter crop"
              required
              min="0"
              type="number"
              title="crop type"
              pattern="[0-9]+([\.,][0-9]+)?"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            />
            <select name="cars" id="msc" className="glass__form__input">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="glass__form__group">
            <input
              id="msc"
              className="glass__form__input"
              placeholder="Enter soil type"
              required
              min="0"
              type="number"
              title="soil type"
              pattern="[0-9]+([\.,][0-9]+)?"
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
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

export default FertForm;
