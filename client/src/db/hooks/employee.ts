import axios from "axios";
const db_url = import.meta.env.VITE_SERVER_URL;

export const getAverageItemTime = (empId?: string) => {
  return axios
    .get(`${db_url}/emp?empId=${empId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllEmployees = () => {
  return axios
    .get(`${db_url}/emp/all`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getEmpItems = (empId?: string) => {
  return axios
    .get(`${db_url}/emp/items?empId=${empId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
