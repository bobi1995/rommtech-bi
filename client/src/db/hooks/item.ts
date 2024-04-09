import axios from "axios";
const db_url = import.meta.env.VITE_SERVER_URL;

export const getItemById = (item?: string) => {
  return axios
    .get(`${db_url}/item?item=${item}`, {
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
