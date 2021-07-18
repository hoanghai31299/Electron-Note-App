import {
  actionSetUser,
  actionChangeLoginStatus,
  LogginStatus,
} from './../redux/action';
import { IClient } from './../interface/index';
import { db } from '.';
import { userInfo } from 'os';

export const USER_COLLECTION = 'users';
export const NOTE_COLLECTION = 'notes';
export const fetchUserByIdentityId = async (
  uid: string,
  dispatch: (a: any) => void
) => {
  try {
    const docRef = db.collection(USER_COLLECTION);
    const client = await docRef.doc(uid).get();
    if (client.exists) {
      const clientData = <IClient>client.data();
      dispatch(actionSetUser(clientData));
      dispatch(actionChangeLoginStatus(LogginStatus.LOGGED));
      return clientData;
    } else return Promise.reject('Khong tim thay');
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createNewUser = async (
  _user: IClient,
  dispatch: (a: any) => void,
  history: any
) => {
  try {
    const { email, id } = _user;
    await db.collection(USER_COLLECTION).doc(id).set({
      id,
      email,
    });
    dispatch(actionSetUser(_user));
    dispatch(actionChangeLoginStatus(LogginStatus.LOGGED));
    history.push('/before_logged');
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface WritableAttributes {
  displayName?: string;
  photoURL?: string;
}

export const updateUser = (id: string, attributes: WritableAttributes) => {
  return db.collection(USER_COLLECTION).doc(id).update(attributes);
};
