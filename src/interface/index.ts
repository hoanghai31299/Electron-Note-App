import { LogginStatus } from '../redux/action';

export interface IClient {
  id: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  connect?: string[];
  bio?: string;
}

export interface INote {
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
  author: string;
  color?: string;
  pin?: boolean;
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
