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

const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  usersList: [],
  msg_success: null,
  isLoading: false,
};
const users = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg_success: "Register Success",
        usersList: [...state.usersList, action.payload],
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        usersList: action.payload,
      };
    case DELET_USER_FAIL:
    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case DELET_USER_SUCCESS:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
        isLoading: false,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        usersList: state.usersList.map((user, i) =>
          user.id === action.payload.id
            ? {
                ...user,
                name: action.payload.name,
                family_name: action.payload.family_name,
              }
            : user
        ),
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
export default users;
