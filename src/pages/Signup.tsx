import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import LoaderButton from '../components/Common/LoaderButton';
import { IMainState, PAGE_VIEW } from '../interface';
import {
  actionChangeLoginStatus,
  actionLoginError,
  LogginStatus,
} from '../redux/action';
import Logo from '../assets/images/logo2.svg';
import { signupFireBase } from '../firebase/authenticate';
const regex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
function Signup() {
  const [formSignup, setFormSignup] = React.useState({
    email: '',
    password: '',
    confirmPwd: '',
    displayName: '',
    emailError: false,
    passwordError: false,
    nameError: false,
  });
  const dispatch = useDispatch();
  const status = useSelector((state: IMainState) => state.status);
  const { loginMessage, loginStatus } = status;
  const handleOnChange = (event: any) => {
    const field = event.target.id;
    setFormSignup({ ...formSignup, [field]: event.target.value });
  };
  const validateForm = () => {
    const checkName = regexName.test(formSignup.displayName);
    const checkPassword = formSignup.password === formSignup.confirmPwd;
    return (
      regex.test(formSignup.email) &&
      formSignup.password.length > 5 &&
      checkPassword &&
      checkName
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
  const validateName = () => {
    const checkName = regexName.test(formSignup.displayName);

    setFormSignup({
      ...formSignup,
      nameError: !checkName,
    });
  };
  const handleSignup = async () => {
    dispatch(actionChangeLoginStatus(LogginStatus.LOGGING_IN));
    try {
      const { email, password, displayName } = formSignup;
      const user = await signupFireBase(email, password);
      await user?.updateProfile({ displayName });
    } catch (error) {
      console.log({ errorSignup: error.message });
      dispatch(actionChangeLoginStatus(LogginStatus.SIGNUP_ERROR));
      dispatch(actionLoginError(error?.message || 'Có gì đó không ổn'));
    }
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
                {formSignup.nameError && (
                  <span className="form-error">Tên không hợp lệ</span>
                )}
                <label htmlFor="email">
                  <BiUser size={24} />
                </label>
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  id="displayName"
                  onChange={handleOnChange}
                  onBlur={validateName}
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
                  placeholder="Type your email..."
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
                <button className="btn btn-signup">Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-bottom-corner">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
