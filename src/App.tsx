import React from 'react';

// import firebase from 'firebase';
import firebase from './database';
import { useDispatch, useSelector } from 'react-redux';
import { actionChangeLoginStatus, LogginStatus } from './redux/action';
import { IClient, IMainState, PAGE_VIEW } from './interface';
import './styles/index.global.css';

import routers from './router';
import { createNewUser, fetchUserByIdentityId } from './database/users';
import Logo from './assets/images/logo.svg';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  withRouter,
} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          //user is logout, handle something here
          dispatch(actionChangeLoginStatus(LogginStatus.LOGOUT));
          history.push('/signin');
          return;
        }
        fetchUserByIdentityId(user.uid, dispatch)
          .then((user) => {
            if (!user?.displayName || !user?.photoURL)
              return history.push('/before_logged');
            return history.push('/');
          })
          .catch(() => {
            const newUser: IClient = {
              id: user.uid,
              email: user.email || '',
            };
            createNewUser(newUser, dispatch, history);
          });
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="paiir-note">
      {routers.map((route, i) => {
        const { path, component, exact } = route;
        return (
          //@ts-ignore
          <Route path={path} key={i} exact={exact} component={component} />
        );
      })}
    </div>
  );
}

export default withRouter(App);
