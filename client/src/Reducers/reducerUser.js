import {
  LOGIN_USER,
  LOGOUT_USER,
  LOADING_USER,
  USER_LOADED,
} from "../Actions/ActionTypes";

const initState = {
  user: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.user };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
