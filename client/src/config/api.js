// API configuration that works for both development and production
const getApiUrl = () => {
  // If environment variable exists, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Otherwise use localhost for development
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl();