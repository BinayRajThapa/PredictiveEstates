import sys
import json
import numpy as np
import pandas as pd
import pickle


def predict(data):
    # Load the model and scaler
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)

    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)

    # Load the feature order
    with open("feature_order.pkl", "rb") as f:
        feature_order = pickle.load(f)

    # Convert the dictionary to a DataFrame
    data = pd.DataFrame(data, index=[0])

    # Convert all columns to numeric, replacing non-numeric values with NaN
    data = data.apply(pd.to_numeric, errors="coerce")

    # Fill NaN values with a default value, e.g. 0
    data = data.fillna(0)

    # Apply log transformation
    for feature in ["total_rooms", "total_bedrooms", "population", "households"]:
        data[feature] = np.log(data[feature] + 1)

    data = data.join(pd.get_dummies(data.ocean_proximity)).drop(
        ["ocean_proximity"], axis=1
    )

    data["bedroom_ratio"] = data["total_bedrooms"] / data["total_rooms"]
    data["household_rooms"] = data["total_rooms"] / data["households"]

    if "ISLAND" in data.columns:
        data = data.drop(["ISLAND"], axis=1)

    # Create a DataFrame with all zeros for the missing columns
    missing_cols = [col for col in feature_order if col not in data.columns]
    missing_df = pd.DataFrame(0, index=np.arange(len(data)), columns=missing_cols)

    # Concatenate the data with the missing columns DataFrame
    data = pd.concat([data, missing_df], axis=1)

    # Reorder the columns to match the order used during training
    data = data[feature_order]

    data_s = scaler.transform(data)

    # Make the prediction
    prediction = model.predict(data_s)

    return prediction[0]


if __name__ == "__main__":
    try:
        data = json.loads(sys.argv[1])
    except IndexError:
        data = {
            "latitude": 37.85,
            "longitude": -122.22,
            "housing_median_age": 41.0,
            "total_rooms": 880.0,
            "total_bedrooms": 129.0,
            "population": 322.0,
            "households": 126.0,
            "median_income": 8.3252,
            "ocean_proximity": "NEAR BAY",
        }
    print(predict(data))
