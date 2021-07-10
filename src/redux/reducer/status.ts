import { PAGE_VIEW } from '../../interface';
import {
  CHANGE_LOGGIN_STATUS,
  CHANGE_PAGE_VIEW,
  LogginStatus,
  LOGGIN_ERROR,
} from '../action';

const initialState = {
  loginStatus: LogginStatus.LOGOUT,
  loginMessage: '',
  currentPage: PAGE_VIEW.HOME,
};

const statusReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_LOGGIN_STATUS: {
      return {
        ...state,
        loginStatus: action.payload,
      };
    }
    case CHANGE_PAGE_VIEW: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case LOGGIN_ERROR: {
      return {
        ...state,
        loginMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
export default statusReducer;
