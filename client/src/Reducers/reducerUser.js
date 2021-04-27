import { LOGIN_USER } from "../Actions/ActionTypes";

const initState = {
  user: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default userReducer;
