import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
try {
  const config = {
    apiKey: 'AIzaSyDbIJkWpHfu-l00BnPBe9wG7XOebdIIHXA',
    authDomain: 'electron-app-b7da9.firebaseapp.com',
    projectId: 'electron-app-b7da9',
    storageBucket: 'electron-app-b7da9.appspot.com',
    messagingSenderId: '1044586034033',
    appId: '1:1044586034033:web:50a2864024bb7d99e6bcd0',
    measurementId: 'G-PJ7LK6X7TN',
  };
  firebase.initializeApp(config);
  firebase.analytics();
} catch (error) {
  console.error('Created firebase before');
}

export const db = firebase.firestore();
export const storage = firebase.storage();

export const AVATAR_STORAGE = 'avatar';

export const uploadImageToStorage = (ref: string, name: string, image: any) => {
  const uploadTask = storage
    .ref(`${ref}/${name}`)
    .put(image, { contentType: 'image/jpeg' });
  return uploadTask;
};

export const getImageFromStorage = (ref: string, child: string) => {
  return storage.ref(ref).child(child).getDownloadURL();
};

export default firebase;
