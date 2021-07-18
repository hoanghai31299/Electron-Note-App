import BeforeLogged from './pages/BeforeLogged';
import Note from './pages/Note';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default [
  {
    path: '/',
    component: Note,
    exact: true,
  },
  {
    path: '/signin',
    component: Signin,
    exact: true,
  },
  {
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    path: '/before_logged',
    component: BeforeLogged,
    exact: true,
  },
];
