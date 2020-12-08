import axios from "axios";

export const addUpdateUser = async (userToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/add-update-user`,
    {},
    {
      headers: {
        userToken,
      },
    }
  );
};
