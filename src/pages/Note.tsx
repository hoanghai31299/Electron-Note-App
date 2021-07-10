import React from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { actionChangeLoginStatus, LogginStatus } from '../redux/action';
function Note() {
  const dispatch = useDispatch();
  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(actionChangeLoginStatus(LogginStatus.LOGOUT));
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={handleSignout}>
          Đăng xuất
        </button>
      </div>
      Helle I'm note page
    </div>
  );
}

export default Note;
