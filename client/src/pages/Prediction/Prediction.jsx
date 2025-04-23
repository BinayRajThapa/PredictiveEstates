import { useState } from 'react';
import { api } from '../../utils/api';
import { Paper, NumberInput, Select, Button, Grid } from '@mantine/core';

const Prediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [formValues, setFormValues] = useState({
    latitude: '',
    longitude: '',
    housing_median_age: '',
    total_rooms: '',
    total_bedrooms: '',
    population: '',
    households: '',
    median_income: '',
    ocean_proximity: '',
  });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let errors = {};

    if (name === 'latitude' && (value < -90 || value > 90)) {
      errors[name] = 'Latitude must be between -90 and 90';
    }

    if (name === 'longitude' && (value < -180 || value > 180)) {
      errors[name] = 'Longitude must be between -180 and 180';
    }

    if (
      [
        'housing_median_age',
        'total_rooms',
        'total_bedrooms',
        'population',
        'households',
      ].includes(name) &&
      !Number.isInteger(Number(value))
    ) {
      errors[name] = `${name} must be an integer`;
    }

    // Add more validations as needed

    return errors;
  };

  const handleChange = (name, value) => {
    // Check if the value is an integer for specific fields
    if (
      [
        'housing_median_age',
        'total_rooms',
        'total_bedrooms',
        'population',
        'households',
      ].includes(name) &&
      !Number.isInteger(Number(value))
    ) {
      setErrors({
        ...errors,
        [name]: `${name} must be an integer`,
      });
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });

    const errors = validate(name, value);
    setErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    for (let key in formValues) {
      if (formValues[key] === '') {
        setErrors({
          ...errors,
          [key]: `${key} is required`,
        });
        return;
      }
    }

    try {
      const response = await api.post('/predict', formValues);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <>
      <div className="wrapper flexColCenter paddings">
        <Paper padding="md" shadow="xs">
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={12}>
                <NumberInput
                  label="Latitude"
                  name="latitude"
                  onChange={(value) => handleChange('latitude', value)}
                  required
                  error={errors.latitude}
                />
                <NumberInput
                  label="Longitude"
                  name="longitude"
                  onChange={(value) => handleChange('longitude', value)}
                  required
                  error={errors.longitude}
                />
                <NumberInput
                  label="Housing Median Age"
                  name="housing_median_age"
                  onChange={(value) =>
                    handleChange('housing_median_age', value)
                  }
                  required
                  step={1}
                />
                <NumberInput
                  label="Total Rooms"
                  name="total_rooms"
                  onChange={(value) => handleChange('total_rooms', value)}
                  required
                  step={1}
                />
                <NumberInput
                  label="Total Bedrooms"
                  name="total_bedrooms"
                  onChange={(value) => handleChange('total_bedrooms', value)}
                  required
                  step={1}
                />
                <NumberInput
                  label="Population"
                  name="population"
                  onChange={(value) => handleChange('population', value)}
                  required
                  step={1}
                />
                <NumberInput
                  label="Households"
                  name="households"
                  onChange={(value) => handleChange('households', value)}
                  required
                  step={1}
                />
                <NumberInput
                  label="Median Income"
                  name="median_income"
                  onChange={(value) => handleChange('median_income', value)}
                  required
                />
                <Select
                  label="Ocean Proximity"
                  name="ocean_proximity"
                  onChange={(value) => handleChange('ocean_proximity', value)}
                  required
                  data={[
                    { value: 'NEAR BAY', label: 'Near Bay' },
                    { value: '<1H OCEAN', label: 'Less than 1 hour to Ocean' },
                    { value: 'INLAND', label: 'Inland' },
                    { value: 'NEAR OCEAN', label: 'Near Ocean' },
                    { value: 'ISLAND', label: 'Island' },
                  ]}
                />
              </Grid.Col>
            </Grid>
            <Button type="submit">Predict</Button>
          </form>
          {prediction && <p>The predicted value is: {prediction}</p>}
        </Paper>
      </div>
    </>
  );
};

export default Prediction;
