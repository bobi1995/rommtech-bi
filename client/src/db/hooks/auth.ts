import axios from "axios";
const db_url = import.meta.env.VITE_SERVER_URL;

export const getLogin = (username?: string, password?: string) => {
  return axios
    .post(
      `${db_url}/auth`,
      { username, password },
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

export const getVerify = (token?: string, access?: string) => {
  return axios
    .post(
      `${db_url}/auth/verify`,
      { token, access },
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

export const getAllUsers = () => {
  return axios
    .get(`${db_url}/auth/users`, {
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

export const createUser = (
  username: string,
  password: string,
  access: string
) => {
  return axios
    .post(
      `${db_url}/auth/user`,
      { username, password, access },
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

export const updateUser = (id: string, username: string, access: string) => {
  return axios
    .put(
      `${db_url}/auth/edit/${id}`,
      { username, access },
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

export const updatePassword = (id: string, password: string) => {
  return axios
    .put(
      `${db_url}/auth/password/${id}`,
      { password },
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

export const deleteUser = (id: string) => {
  return axios
    .delete(`${db_url}/auth/user/${id}`, {
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
