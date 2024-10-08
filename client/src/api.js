import axios from "axios";

const API_URL = "http://localhost:5000/api/cheatsheets";

export const getCheatSheets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCheatSheet = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const uploadCheatSheet = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
