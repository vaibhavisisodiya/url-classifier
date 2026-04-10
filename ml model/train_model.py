import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = {
    "url": [
        "https://google.com",
        "https://github.com",
        "https://amazon.in",
        "http://secure-login-bank.com",
        "http://free-money.xyz",
        "http://click-here-now.net"
    ],
    "label": [0, 0, 0, 1, 1, 1]
}

df = pd.DataFrame(data)

def extract_features(url):
    return [
        len(url),
        url.count('.'),
        int('https' in url),
        int('@' in url),
        int('-' in url)
    ]

X = df['url'].apply(extract_features).tolist()
y = df['label']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Model trained successfully!")