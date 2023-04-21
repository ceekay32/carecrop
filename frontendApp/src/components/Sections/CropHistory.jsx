// import React, { useContext } from "react";
// import CropContext from "../../context/CropContext";

// function CropHistory() {
//   const {
//     nitrogen,
//     potassium,
//     phosphorus,
//     ph,
//     temp,
//     humidity,
//     rainfall,
//     message,
//     success,
//     history,
//     setNitrogen,
//     setPotassium,
//     setPhosphorus,
//     setPh,
//     setTemp,
//     setHumidity,
//     setRainfall,
//     setMessage,
//     setSuccess,
//     setHistory,
//     handleReset,
//     handleSubmit,
//     parameters,
//   } = useContext(CropContext);
//   return (
//     <div className="history">
//       <h4>History</h4>
//       {history.map((item, index) => (
//         <p key={index}>
//           <strong>Nitrogen:</strong> {item.nitrogen} <br />
//           <strong>Phosphorus:</strong> {item.phosphorus} <br />
//           <strong>Potassium:</strong> {item.potassium} <br />
//           <strong>PH value:</strong> {item.ph} <br />
//           <strong>Temperature:</strong> {item.temp} <br />
//           <strong>Rainfall:</strong> {item.rainfall} <br />
//           <strong>Humidtiy:</strong> {item.humidity} <br />
//           <strong>Suggested crop:</strong> {item.crop}
//         </p>
//       ))}
//     </div>
//   );
// }

// export default CropHistory;
