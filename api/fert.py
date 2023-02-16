# Importing necessary libraries
import uvicorn
import pandas as pd
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
import pickle

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
fert_model = pickle.load(open('./models/FS(RandomForest).pkl', 'rb'))

# Load the fertilizer data
data = pd.read_csv('./dataset/fertilizer_data.csv')

# Transforming the data
label_encoder = LabelEncoder()
data['Soil Type'] = label_encoder.fit_transform(data['Soil Type'])
data['Crop Type'] = label_encoder.fit_transform(data['Crop Type'])

# Defining the model input types
class FertilizerRecommendation(BaseModel):
    # temp: int
    # humidity: int
    # moisture: int
    # soil: int
    # crop: int
    nitrogen: int
    potassium: int
    phosphorus: int

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to Fertilizer Recommendation model"}

# Setting up the prediction route
@app.post("/predict_fertilizer/")
async def get_predict_fertilizer(data: FertilizerRecommendation):
    sample2 = [[
        # data.temp,
        # data.humidity,
        # data.moisture,
        # data.soil,
        # data.crop,
        data.nitrogen,
        data.potassium,
        data.phosphorus
    ]]

    fertilizer = fert_model.predict(sample2)[0]

    fertilizer_names = ['Urea', 'DAP', 'Potassium_Sulfate', '14-35-14', '28-28', '10-26-26', '17-17-17']

    output = {
        "data": {
            "fertilizer": fertilizer_names[fertilizer],
            "fertilizer_type": str(fertilizer),
        }
    }

    return output

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
