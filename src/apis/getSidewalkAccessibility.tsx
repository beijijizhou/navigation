import axios from 'axios';
const url = `http://localhost:5000/api/data?`;

// Define the function that fetches the sidewalk accessibility data
export const getSidewalkAccessibility = async (linePoints) => {
    try {
      // Construct the URL with query parameters
      
      const response = await axios.post(url, {linePoints});
      return response.data
    } catch (error) {
      console.error('Error fetching sidewalk accessibility data:', error);
      throw error;
    }
  };