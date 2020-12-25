import axios from "axios";

export const addUpdateUser = async (usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/add-update-user`,
    {},
    {
      headers: {
        usertoken,
      },
    }
  );
};

export const currentUser = async (usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        usertoken,
      },
    }
  );
};

export const currentAdmin = async (usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        usertoken,
      },
    }
  );
};
