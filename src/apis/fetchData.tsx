import axios from 'axios';
import { locationType, originLocationType } from '../Type';
const url = import.meta.env.VITE_API_URL;

// const bmcc = { lat: 40.713536, lng: -74.011223 };
// const url =  'http://34.46.145.148:5000/get-sidewalk-features-in-range';

// const home = { lat: 40.7898531, lng: -73.8078768 }
import { WKBStringArray } from '../Type';
// Define the function that fetches the sidewalk accessibility data
import { WKBArrayToGeometry } from '../utils/readWKB';
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

export const getSidewalkFeaturesInRange = async (currentPosition: originLocationType) => {
  try {
    const { lat, lng } = currentPosition as google.maps.LatLngLiteral;
    const km_distance = 0.100; // You can adjust the distance as needed
    const requestedUrl = `${url}?focal_lat=${lat}&focal_lon=${lng}&km_distance=${km_distance}`;
    const response = await axios.get(requestedUrl);
    const geometryArray = WKBArrayToGeometry(response.data.points as WKBStringArray[])
    
    return geometryArray
  } catch (error) {
    console.error('Error fetching sidewalk accessibility data:', error);
    throw error;
  }
};