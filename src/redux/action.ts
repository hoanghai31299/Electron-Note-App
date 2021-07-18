import { IClient } from './../interface/index';
import { PAGE_VIEW } from '../interface';

export const CHANGE_PAGE_VIEW = 'CHANGE_PAGE_VIEW';
export const CHANGE_LOGGIN_STATUS = 'CHANGE_LOGGIN_STATUS';
export const LOGGIN_ERROR = 'LOGGIN_ERROR';
export const SET_USER = 'SET_USER';
export enum LogginStatus {
  LOGGED = 'LOGGED',
  LOGOUT = 'LOGOUT',
  LOGGING_IN = 'LOGGING_IN',
  LOGGIN_ERROR = 'LOGGIN_ERROR',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
}

export const actionChangeLoginStatus = (status: LogginStatus) => {
  return {
    type: CHANGE_LOGGIN_STATUS,
    payload: status,
  };
};

export const actionChangePageView = (newPage: PAGE_VIEW) => {
  return {
    type: CHANGE_PAGE_VIEW,
    payload: newPage,
  };
};

export const actionLoginError = (error: string) => {
  return {
    type: LOGGIN_ERROR,
    payload: error,
  };
};

export const actionSetUser = (user: IClient) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
