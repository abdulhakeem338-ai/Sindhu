import axios from 'axios';
import { API } from '../constants/constants';
import { Alert } from 'react-native';

const apiService = {
  signup: async (data: any) => {
    try {
      const response = await axios.post(
        `${API.BASE_URL}${API.ENDPOINTS.SIGN_UP}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: API.TIMEOUT,
        }
      );
      
      // Handle different success status codes
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Signup API error:', error);
      
      // Handle axios errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Signup failed';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Network error
        throw new Error('Network error. Please check your connection.');
      } else {
        // Other errors
        throw new Error('Something went wrong. Please try again.');
      }
    }
  },
  
  login: async (data: any) => {
    try {
      const response = await axios.post(
        `${API.BASE_URL}${API.ENDPOINTS.LOGIN}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: API.TIMEOUT,
        }
      );
      
      // Handle different success status codes
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login API error:', error);
      
      // Handle axios errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Login failed';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Network error
        throw new Error('Network error. Please check your connection.');
      } else {
        // Other errors
        throw new Error('Something went wrong. Please try again.');
      }
    }
  },
};

export default apiService;
