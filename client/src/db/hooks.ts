import axios from "axios";
const db_url = import.meta.env.VITE_SERVER_URL;

export const getOrderById = (
  order?: string,
  selectedDate?: string,
  item?: string
) => {
  return axios
    .get(
      `${db_url}/order?order=${order}&selectedDate=${selectedDate}&item=${item}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
