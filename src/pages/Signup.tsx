import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import LoaderButton from '../components/Common/LoaderButton';
import { IMainState, PAGE_VIEW } from '../interface';
import {
  actionChangeLoginStatus,
  actionChangePageView,
  actionLoginError,
  actionSetUser,
  LogginStatus,
} from '../redux/action';
import Logo from '../assets/images/logo2.svg';
import { signupFireBase } from '../database/authenticate';
import { useHistory } from 'react-router-dom';
import LogoPaiir from '../components/Common/LogoPaiir';
const regex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
function Signup() {
  const [formSignup, setFormSignup] = React.useState({
    email: '',
    password: '',
    confirmPwd: '',
    emailError: false,
    passwordError: false,
  });
  const dispatch = useDispatch();
  const status = useSelector((state: IMainState) => state.status);
  const history = useHistory();
  const { loginMessage, loginStatus } = status;
  const handleOnChange = (event: any) => {
    const field = event.target.id;
    setFormSignup({ ...formSignup, [field]: event.target.value });
  };
  const validateForm = () => {
    const checkPassword = formSignup.password === formSignup.confirmPwd;
    return (
      regex.test(formSignup.email) &&
      formSignup.password.length > 5 &&
      checkPassword
    );
  };
  const validateEmail = () => {
    const check = regex.test(formSignup.email);
    setFormSignup({ ...formSignup, emailError: !check });
  };
  const validatePassword = () => {
    setFormSignup({
      ...formSignup,
      passwordError: !(formSignup.password.length > 5),
    });
  };
  const handleSignup = async () => {
    dispatch(actionChangeLoginStatus(LogginStatus.LOGGING_IN));
    try {
      const { email, password } = formSignup;
      await signupFireBase(email, password);
    } catch (error) {
      dispatch(actionChangeLoginStatus(LogginStatus.SIGNUP_ERROR));
      dispatch(actionLoginError(error?.message || 'Có gì đó không ổn'));
    }
  };
  const handleSigninClick = () => {
    history.push('/signin');
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
            {loginStatus === LogginStatus.SIGNUP_ERROR && (
              <div className="alert alert-warning">{loginMessage}</div>
            )}
            <div className="form-heading text-center p-3 flex-1">ĐĂNG KÝ</div>
            <div className="form-signin-body">
              <div className="form-input d-flex mb-2 align-items-center">
                {formSignup.emailError && (
                  <span className="form-error">Email không đúng định dạng</span>
                )}
                <label htmlFor="email">
                  <MdEmail size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  id="email"
                  onChange={handleOnChange}
                  onBlur={validateEmail}
                />
              </div>
              <div className="form-input d-flex mb-2 align-items-center">
                {formSignup.passwordError && (
                  <span className="form-error">Password không đủ độ dài</span>
                )}
                <label htmlFor="password">
                  <RiLockPasswordFill size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  id="password"
                  onChange={handleOnChange}
                  onBlur={validatePassword}
                />
              </div>
              <div className="form-input d-flex  align-items-center">
                <label htmlFor="email">
                  <RiLockPasswordFill size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Confirm password"
                  type="password"
                  id="confirmPwd"
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-signin-button d-flex mt-4">
                <LoaderButton
                  onClick={handleSignup}
                  loading={loginStatus === LogginStatus.LOGGING_IN}
                  disabled={
                    !validateForm() || loginStatus === LogginStatus.LOGGING_IN
                  }
                  btnClass="btn-signin mr-2"
                >
                  Đăng ký
                </LoaderButton>
                <button className="btn btn-signup" onClick={handleSigninClick}>
                  Đăng nhập
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

export default Signup;
