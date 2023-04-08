# Importing necessary libraries
import pandas as pd
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
from fastapi import FastAPI, File, UploadFile
from PIL import Image
from keras.preprocessing import image
from keras.models import load_model
import numpy as np
import io
import torch
from torchvision import transforms
from model_details import ResNet9
from disease_details import disease_dic


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
crop_model = pickle.load(open('./models/CR(RandomForest).pkl', 'rb'))
fert_model = pickle.load(open('./models/FS(RandomForest).pkl', 'rb'))



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
data = pd.read_csv('./dataset/fertilizer_data.csv')

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

classifier = load_model('./models/Trained_model.h5')

@app.post("/predict_pesticide/")
async def predict(image_file: UploadFile = File(...)):
    try:
        img = Image.open(image_file.file).resize((64, 64))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        result = classifier.predict(img_array)
        classes = ['aphids', 'armyworm', 'beetle', 'bollworm', 'earthworm',
                   'grasshopper', 'mites', 'mosquito', 'sawfly', 'stem borer']
        pred_class = np.argmax(result, axis=1)[0]
        pest_identified = classes[pred_class]
        return pest_identified
    except Exception as e:
        return {"Error": str(e)}


# -------------------------DISEASE DETECTION MODELS -----------------------------------------------

# Loading plant disease classification model

disease_classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']

disease_model_path = './models/plant-disease-model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(
    disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()


def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label
    :params: image
    :return: prediction (string)
    """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    # Retrieve the class label
    return prediction




@app.post("/disease-predict")
async def disease_prediction(file: UploadFile = File(...)):
    title = 'Carecrop - Disease Detection'
    if not file:
        return title

    try:
        img = await file.read()

        prediction = predict_image(img)

        prediction = disease_dic[prediction]

        return prediction.Cause

    except:
        pass

    return {"title": title}

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')