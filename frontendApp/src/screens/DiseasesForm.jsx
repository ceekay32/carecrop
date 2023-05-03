// import "../style/Glass.css";
// import "../style/index.css";
import "../style/File.css";
import { useState } from "react";
import axios from "axios";

function DiseasesForm() {
  const [imageFile, setImageFile] = useState(null);
  const [crop, setCrop] = useState("");
  const [disease, setDisease] = useState("");
  const [cause, setCause] = useState("");
  const [prevention, setPrevention] = useState("");
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", imageFile);

    axios
      .post("http://localhost:8080/disease-predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFullData(response.data);
        setCrop(response.data.Crop);
        setDisease(response.data.Disease);
        setCause(response.data.Cause);
        setPrevention(response.data.Prevention);
        setError(null);
      })
      .catch((error) => {
        setError("Error predicting disease.");
        console.error(error);
      });
  };

  return (
    <div style={{ backgroundColor: "#70a062" }}>
      <div className="containers">
        {/* <form onSubmit={(e) => handleSubmit(e)} className="glass__form"> */}
        <div>
          <h4>Disease detection</h4>
          <div>
            <form onSubmit={handleSubmit} className="">
              <label className="btn btn-primary">
                Upload an image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="glass__form__btn file"
                  // value="Upload an image"
                />
              </label>
              <br />
              {imageFile && (
                <button className="glass__form__btn_third" type="submit">
                  Predict
                </button>
              )}
            </form>
          </div>
        </div>
        {/* </form> */}
      </div>
      <div className="containers1">
        {crop && (
          <div className="crop orangeBg">
            <h2>Crop in the image is {crop}</h2>
          </div>
        )}

        {disease && (
          <div className="disease greyBg">
            <h2>Disease: {disease}</h2>
          </div>
        )}

        {cause && (
          <div className="cause blueBg">
            <h2>Cause:</h2>
            <p>{cause}</p>
          </div>
        )}

        {prevention && (
          <div className="prevention brownBg">
            <h2>Prevention:</h2>
            {/* <SeparatePoints paragraph={prevention} /> */}
            <p>{prevention}</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseasesForm;
