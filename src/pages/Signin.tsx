import React from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
// Configure FirebaseUI.
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import '../styles/signin.global.css';
import LoaderButton from '../components/Common/LoaderButton';
import { signinFireBase } from '../database/authenticate';
import { IMainState, PAGE_VIEW } from '../interface';
import {
  actionChangeLoginStatus,
  actionChangePageView,
  actionLoginError,
  LogginStatus,
} from '../redux/action';
import LogoPaiir from '../components/Common/LogoPaiir';
import { useHistory } from 'react-router-dom';
function Signin() {
  const status = useSelector((state: IMainState) => state.status);
  const dispatch = useDispatch();
  const { loginStatus, loginMessage } = status;
  const [formSignin, setFormSignin] = React.useState({
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  });
  const handleOnChange = (event: any) => {
    const field = event.target.id;
    setFormSignin({ ...formSignin, [field]: event.target.value });
  };
  const history = useHistory();
  const validateForm = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(formSignin.email) && formSignin.password.length > 5;
  };
  const validateEmail = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = regex.test(formSignin.email);
    setFormSignin({ ...formSignin, emailError: !check });
  };
  const validatePassword = () => {
    setFormSignin({
      ...formSignin,
      passwordError: !(formSignin.password.length > 5),
    });
  };
  const handleSignin = async () => {
    dispatch(actionChangeLoginStatus(LogginStatus.LOGGING_IN));
    const { email, password } = formSignin;
    try {
      await signinFireBase(email, password);
    } catch (error) {
      dispatch(actionChangeLoginStatus(LogginStatus.LOGGIN_ERROR));
      dispatch(actionLoginError(error?.message || 'Có điều gì đó không ổn'));
    }
  };
  const handleSignupClick = () => {
    history.push('/signup');
  };

  return (
    <div className="signin-page  d-flex align-items-center">
      <div className="container">
        <div className="mb-5 signin-heading text-center">
          <span>CHÀO MỪNG BẠN ĐẾN VỚI</span>
          <span>PAIIR</span>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-signin">
            {loginStatus === LogginStatus.LOGGIN_ERROR && (
              <div className="alert alert-warning">{loginMessage}</div>
            )}
            <div className="form-heading text-center p-3 flex-1">ĐĂNG NHẬP</div>
            <div className="form-signin-body">
              <div className="form-input d-flex mb-2 align-items-center">
                {formSignin.emailError && (
                  <span className="form-error">Email không đúng định dạng</span>
                )}
                <label htmlFor="email">
                  <MdEmail size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Type your email..."
                  type="email"
                  id="email"
                  onChange={handleOnChange}
                  onBlur={validateEmail}
                />
              </div>
              <div className="form-input d-flex align-items-center">
                {formSignin.passwordError && (
                  <span className="form-error">Password không đủ độ dài</span>
                )}
                <label htmlFor="password">
                  <RiLockPasswordFill size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Type your password..."
                  type="password"
                  id="password"
                  onChange={handleOnChange}
                  onBlur={validatePassword}
                />
              </div>
              <div className="form-signin-button d-flex mt-4">
                <LoaderButton
                  onClick={handleSignin}
                  loading={loginStatus === LogginStatus.LOGGING_IN}
                  disabled={
                    !validateForm() || loginStatus === LogginStatus.LOGGING_IN
                  }
                  btnClass="btn-signin mr-2"
                >
                  Đăng nhập
                </LoaderButton>
                <button className="btn btn-signup" onClick={handleSignupClick}>
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="logo-bottom-corner">
        <LogoPaiir size="md" />
      </div>
    </div>
  );
}

export default Signin;
