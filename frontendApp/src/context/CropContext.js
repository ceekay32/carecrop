import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CropContext = createContext();
export const CropProvider = ({ children }) => {
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
    <CropContext.Provider
      value={{
        nitrogen,
        potassium,
        phosphorus,
        ph,
        temp,
        humidity,
        rainfall,
        message,
        success,
        history,
        setNitrogen,
        setPotassium,
        setPhosphorus,
        setPh,
        setTemp,
        setHumidity,
        setRainfall,
        setMessage,
        setSuccess,
        setHistory,
        handleReset,
        handleSubmit,
      }}
    >
      {children}
    </CropContext.Provider>
  );
};
