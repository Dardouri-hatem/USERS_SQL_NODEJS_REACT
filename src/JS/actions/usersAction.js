import axios from "axios";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELET_USER_SUCCESS,
  DELET_USER_FAIL,
  UPDATE_SUCCESS,
} from "../constants";
import { returnErrors, clearErrors } from "./errorAction";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().users.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};

/*-------------------------------------- GETTING USERS -----------------------------------*/
export const getUsers = () => async (dispatch, getState) => {
  try {
    const users = await axios.get(
      "http://localhost:5000/users",
      tokenConfig(getState)
    );
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
    });
  }
};
/*-------------------------------------- REGISTER A NEW USER -----------------------------------*/

export const registerUser = ({ name, family_name, password }) => async (
  dispatch
) => {
  try {
    const savedUser = await axios.post("http://localhost:5000/users/add_user", {
      name,
      family_name,
      password,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: savedUser.data,
    });
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "REGISTER_FAIL",
      })
    );
  }
};

/*-------------------------------------- LOGIN VALIDATION -----------------------------------*/

export const login = ({ name, password }) => async (dispatch) => {
  try {
    const loginUser = await axios.post("http://localhost:5000/users/login", {
      name,
      password,
    });
    await axios.put(
      `http://localhost:5000/users/login/${loginUser.data.user.id}`
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginUser.data,
    });
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "LOGIN_FAIL",
      })
    );
  }
};

/*--------------------------------------- DELETE A USER ----------------------------------------------*/

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(
      `http://localhost:5000/users/delete_user/${id}`,
      tokenConfig(getState)
    );
    dispatch({
      type: DELET_USER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELET_USER_FAIL,
    });
  }
};

/*--------------------------------------- UPDATE A USER ----------------------------------------------*/

export const updateUser = ({ id, name, family_name }) => async (
  dispatch,
  getState
) => {
  try {
    const userUpdated = await axios.put(
      `http://localhost:5000/users/update_user/${id}`,
      { name, family_name },
      tokenConfig(getState)
    );
    dispatch({
      type: UPDATE_SUCCESS,
      payload: userUpdated.data,
    });
  } catch (err) {
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "UPDATE_FAIL",
      })
    );
  }
};

/*--------------------------------------- LOGOUT A USER ----------------------------------------------*/

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
