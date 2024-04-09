import axios from "axios";
const db_url = import.meta.env.VITE_SERVER_URL;

export const getOrderQuantities = (order?: string) => {
  return axios
    .get(`${db_url}/order/quantities?order=${order}`, {
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
