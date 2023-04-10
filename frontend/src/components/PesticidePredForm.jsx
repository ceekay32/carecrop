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

function PesticidePredForm() {
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
        <button type="submit">Submit</button>
      </form>
      {pestIdentified && <p>The identified pest is {pestIdentified}</p>}
    </div>
  );
}

export default PesticidePredForm;
