import React from 'react';

import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionChangeLoginStatus,
  actionChangePageView,
  LogginStatus,
} from './redux/action';
import { IMainState, PAGE_VIEW } from './interface';
import Note from './pages/Note';
import Signin from './pages/Signin';
import './styles/index.global.css';
import Signup from './pages/Signup';
if (typeof window !== 'undefined') {
  try {
    const config = {
      apiKey: 'AIzaSyDbIJkWpHfu-l00BnPBe9wG7XOebdIIHXA',
      authDomain: 'electron-app-b7da9.firebaseapp.com',
    };
    firebase.initializeApp(config);
  } catch (error) {
    console.error('Created firebase before');
  }
}

export default function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: IMainState) => state.status?.currentPage
  );
  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          //user is logout, handle something here
          console.log('user logged out');
          dispatch(actionChangeLoginStatus(LogginStatus.LOGOUT));
          dispatch(actionChangePageView(PAGE_VIEW.SIGNIN));
          return;
        }
        dispatch(actionChangePageView(PAGE_VIEW.HOME));
        dispatch(actionChangeLoginStatus(LogginStatus.LOGGED));
      });
    return () => unregisterAuthObserver();
  }, []);
  const getCurrentPage = () => {
    switch (currentPage) {
      case PAGE_VIEW.HOME:
        return <Note />;
      case PAGE_VIEW.SIGNIN:
        return <Signin />;
      case PAGE_VIEW.SIGNUP:
        return <Signup />;
      default:
        return 'Hello';
    }
  };

  return <div className="paiir-note">{getCurrentPage()}</div>;
}
