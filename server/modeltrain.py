import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor

data = pd.read_csv("housing.csv")
data.dropna(inplace=True)

X = data.drop(["median_house_value"], axis=1)
y = data["median_house_value"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

train_data = X_train.join(y_train)

train_data["total_rooms"] = np.log(train_data["total_rooms"] + 1)
train_data["total_bedrooms"] = np.log(train_data["total_bedrooms"] + 1)
train_data["population"] = np.log(train_data["population"] + 1)
train_data["households"] = np.log(train_data["households"] + 1)

train_data = train_data.join(pd.get_dummies(train_data.ocean_proximity)).drop(
    ["ocean_proximity"], axis=1
)

train_data["bedroom_ratio"] = train_data["total_bedrooms"] / train_data["total_rooms"]
train_data["household_rooms"] = train_data["total_rooms"] / train_data["households"]

scaler = StandardScaler()

X_train, y_train = (
    train_data.drop(["median_house_value"], axis=1),
    train_data["median_house_value"],
)

if "ISLAND" in X_train.columns:
    X_train = X_train.drop(["ISLAND"], axis=1)

X_train_s = scaler.fit_transform(X_train)
feature_order = X_train.columns.tolist()

test_data = X_test.join(y_test)

test_data["total_rooms"] = np.log(test_data["total_rooms"] + 1)
test_data["total_bedrooms"] = np.log(test_data["total_bedrooms"] + 1)
test_data["population"] = np.log(test_data["population"] + 1)
test_data["households"] = np.log(test_data["households"] + 1)

test_data = test_data.join(pd.get_dummies(test_data.ocean_proximity)).drop(
    ["ocean_proximity"], axis=1
)

test_data["bedroom_ratio"] = test_data["total_bedrooms"] / test_data["total_rooms"]
test_data["household_rooms"] = test_data["total_rooms"] / test_data["households"]

X_test, y_test = (
    test_data.drop(["median_house_value"], axis=1),
    test_data["median_house_value"],
)

if "ISLAND" in X_test.columns:
    X_test = X_test.drop(["ISLAND"], axis=1)

X_test = X_test[feature_order]

X_test_s = scaler.transform(X_test)

forest = RandomForestRegressor()

forest.fit(X_train_s, y_train)

score = forest.score(X_test_s, y_test)
print(f"Model score: {score}")

with open("model.pkl", "wb") as f:
    pickle.dump(forest, f)

with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("feature_order.pkl", "wb") as f:
    pickle.dump(feature_order, f)
