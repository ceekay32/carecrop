# Importing necessary libraries
import pandas as pd
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder


# Initializing the FastAPI server
app = FastAPI()

# Setting up CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",    
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
crop_model = pickle.load(open('../models/CR(RandomForest).pkl', 'rb'))
fert_model = pickle.load(open('../models/FS(RandomForest).pkl', 'rb'))



# Defining the model input types
class CropRecommendation(BaseModel):
    nitrogen: int
    phosphorus: int
    potassium: int
    ph: float
    temp: int
    rainfall: int
    humidity: int

class FertRecommendation(BaseModel):
    temp: int
    humidity: int
    moisture: int
    soil: str
    crop: str
    nitrogen: int
    potassium: int
    phosphorus: int

# Load data from fertilizer_data.csv
data = pd.read_csv('../dataset/fertilizer_data.csv')

# Encode the categorical variables 'soil' and 'crop'
soil_encoder = LabelEncoder()
data['Soil Type'] = soil_encoder.fit_transform(data['Soil Type'])

crop_encoder = LabelEncoder()
data['Crop Type'] = crop_encoder.fit_transform(data['Crop Type'])

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to Crop Recommendation model"}


# Setting up the prediction route
@app.post("/predict_crop/")
async def get_predict_crop(data: CropRecommendation):
    sample = [[
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.ph,
        data.temp,
        data.rainfall,
        data.humidity
    ]]

    crop = crop_model.predict(sample).tolist()[0]

    # Mapping the integer output to actual crop name
    crop_names=['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']
    predicted_crop = crop_names[crop] if isinstance(crop, int) and crop < len(crop_names) else "unknown"
    return {
        "data": {
            "predicted_crop": predicted_crop,
            "crop_type": crop
        }
    }

@app.post("/predict_fert/")
async def get_predict_fert(data: FertRecommendation):
    sample2 = [[
        data.temp,
        data.humidity,
        data.moisture,
        data.soil,
        data.crop,
        data.nitrogen,
        data.potassium,
        data.phosphorus
    ]]
     # Transform the categorical variables 'soil' and 'crop' in the input data
    data_dict = data.dict()
    data_dict['soil'] = soil_encoder.transform([data_dict['soil']])[0]
    data_dict['crop'] = crop_encoder.transform([data_dict['crop']])[0]

    sample2 = [list(data_dict.values())]
    fert = fert_model.predict(sample2).tolist()[0]
    # Mapping the integer output to actual fert name
    fert_names=['28-28', 'Urea', '17-17-17', 'DAP', '14-35-14', '10-26-26', '20-20']
    # predicted_fert = fert_names[fert] if isinstance(fert, int) and fert < len(fert_names) else "unknown"
    return {
        "data": {
            "predicted_fert": fert_names[fert],
            "fert_type": fert,
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
