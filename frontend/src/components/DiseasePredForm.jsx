import React, { useState } from "react";
import axios from "axios";
function SeparatePoints({ paragraph }) {
  //   const sentences = paragraph.split(". ");
  //   return (
  //     <ul>
  //       {sentences.map((sentence, index) => (
  //         <li key={index}>
  //           <span>{index + 1}. </span>
  //           {sentence.trim()}
  //         </li>
  //       ))}
  //     </ul>
  //   );
}

function DiseasePredictionForm() {
  const [imageFile, setImageFile] = useState(null);
  const [crop, setCrop] = useState("");
  const [disease, setDisease] = useState("");
  const [cause, setCause] = useState("");
  const [prevention, setPrevention] = useState("");
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState("");

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Upload image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>

      {crop && (
        <div>
          <h2>Crop: {crop}</h2>
        </div>
      )}

      {disease && (
        <div>
          <h2>Disease: {disease}</h2>
        </div>
      )}

      {cause && (
        <div>
          <h2>Cause:</h2>
          <p>{cause}</p>
        </div>
      )}

      {prevention && (
        <div>
          <h2>Prevention:</h2>
          {/* <SeparatePoints paragraph={prevention} /> */}
          <p>{prevention}</p>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default DiseasePredictionForm;
