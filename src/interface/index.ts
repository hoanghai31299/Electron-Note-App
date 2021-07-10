import { LogginStatus } from '../redux/action';

export interface IClient {
  displayName: string;
  email: string;
  photoUrl: string;
  connect: [string] | [];
}

export interface IMainState {
  status: {
    loginStatus: LogginStatus;
    loginMessage: string;
    currentPage: PAGE_VIEW;
  };
  client: IClient;
}

export enum PAGE_VIEW {
  HOME = 'HOME',
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
}
