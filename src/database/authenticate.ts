import firebase from 'firebase';
import { createNewUser } from './users';

export const signinFireBase = async (email: string, password: string) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      return user;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const signupFireBase = (
  email: string,
  password: string
): Promise<firebase.User | null> => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const signOut = () => {
  return firebase.auth().signOut();
};
