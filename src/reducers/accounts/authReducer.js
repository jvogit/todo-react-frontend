import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SENDING_REQUEST,
} from "utils/storeConsts";

const initial_state = { user: null, error: null, inProgress: false }

export const authReducer = (state = initial_state, action) => {
  let new_state = { ...state };

  switch (action.type) {
    default:
      break;
    case SENDING_REQUEST:
      new_state.inProgress = true;
      break;
    case LOGIN_SUCCESS:
      new_state.error = null;
      new_state.user = action.user;
      new_satte.inProgress = false;
      break;
    case LOGIN_FAILURE:
      new_state.error = action.error;
      new_state.user = null;
      new_satte.inProgress = false;
      break;
  }

  return new_state;
}

export default authReducer;