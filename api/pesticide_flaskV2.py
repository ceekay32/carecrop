from flask import Flask, render_template, request, Markup
import pandas as pd
import os
import numpy as np
from keras.preprocessing import image
from keras.models import load_model
import pickle
from PIL import Image

classifier = load_model('../models/Trained_model.h5')

app = Flask(__name__)

def pred_pest(pest):
    try:
        test_image = Image.open(pest).resize((64,64))
        test_image = np.array(test_image)
        test_image = np.expand_dims(test_image, axis=0)
        result = classifier.predict(test_image)
        return result
    except Exception as e:
        return f"Error: {str(e)}"


@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['image']
        filename = file.filename
        file_path = os.path.join('static/uploads', filename)
        file.save(file_path)

        pred = pred_pest(file_path)

        if isinstance(pred, str):
            pest_identified = pred
        else:
            classes = ['aphids', 'armyworm', 'beetle', 'bollworm', 'earthworm', 
                       'grasshopper', 'mites', 'mosquito', 'sawfly', 'stem borer']
            pred_class = np.argmax(pred, axis=1)[0]
            pest_identified = classes[pred_class]

        return pest_identified

if __name__ == '__main__':
    app.run(debug=True)
