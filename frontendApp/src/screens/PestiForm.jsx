import "../style/Glass.css";
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
    <div className="body-crop">
      <div className="glass">
        {/* <form onSubmit={(e) => handleSubmit(e)} className="glass__form"> */}
        <div className="glass__form">
          <h4>Pesticide detection</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Upload an image:
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </label>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Predict
              </button>
            </form>
            {pestIdentified && (
              <p>
                The identified pest is <b>{pestIdentified}</b>
              </p>
            )}
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default PestiForm;
