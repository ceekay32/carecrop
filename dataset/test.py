import pandas as pd

df = pd.read_csv('fertilizer_data.csv')

a= df['Soil Type'].unique()
b=df['Crop Type'].unique()
print(a)
print(b)


