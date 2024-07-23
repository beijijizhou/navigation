import axios from 'axios';
import { locationType } from '../Type';
const url = `http://34.46.145.148:5000/get-sidewalk-features-in-range?`;

// Define the function that fetches the sidewalk accessibility data

export const getSidewalkAccessibility = async (linePoints: locationType[]) => {
  try {
    // Construct the URL with query parameters

    const response = await axios.post(url, { linePoints });
    return response.data
  } catch (error) {
    console.error('Error fetching sidewalk accessibility data:', error);
    throw error;
  }
};

export const getSidewalkFeaturesInRange = async (currentPosition: locationType) => {
  try {
    // Construct the URL with query parameters

    const response = await axios.post(url, currentPosition);
    return response.data
  } catch (error) {
    console.error('Error fetching sidewalk accessibility data:', error);
    throw error;
  }
};