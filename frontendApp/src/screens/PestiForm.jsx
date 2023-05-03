import "../style/Glass.css";
import "../style/File.css";

import { useState } from "react";
import axios from "axios";

function PestiForm() {
  const [file, setFile] = useState(null);
  const [pestIdentified, setPestIdentified] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image_file", file);
    const response = await fetch("http://localhost:8080/predict_pesticide/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setPestIdentified(data);
  };

  return (
    <div style={{ backgroundColor: "#70a062" }}>
      <div className="containers">
        {/* <form onSubmit={(e) => handleSubmit(e)} className="glass__form"> */}
        <div className="">
          <h4>Pest detection</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <label className="btn btn-primary">
                Upload an image
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => setFile(event.target.files[0])}
                  className="btn btn-primary file"
                />
              </label>
              <br></br>
              {file && (
                <button className="glass__form__btn_third " type="submit">
                  Predict
                </button>
              )}
            </form>
          </div>
        </div>
        {/* </form> */}
      </div>
      <div className="containers1">
        {pestIdentified && (
          <div className="pest brownBg">
            The identified pest is &nbsp;
            <b>{pestIdentified}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default PestiForm;
