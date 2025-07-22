import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
      } else if (error.response.status === 500) {
        console.error('Server error! Please try again later.');
      } else {
        console.error(`HTTP error: ${error.response.status}`, error.response.data);
      }
    }
    else if (error.request) {
      console.error('Network error: No response received from server.');
    }
    else {
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;