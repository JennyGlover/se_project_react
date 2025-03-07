import { useEffect, useRef } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useForm from '../../hooks/useForm';
import { useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AppContexts';
import './LoginModal.css';

function LoginModal({
  isLoginModalVisible,
  handleCloseModal,
  handleLogin,
  setIsSignupModalVisible,
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const isFormValid = Object.values(values).every((value, index) => {
    const input = [emailRef.current, passwordRef.current][index];
    return value.trim() !== '' && input?.validity.valid;
  });

  const { validationFailed, setValidationFailed } = useContext(
    AuthenticationContext,
  );
  const failedValidationInputLabel =
    'ModalWithForm__input-label LoginModal__incorrect-input';
  const failedValidationInput =
    'ModalWithForm__input LoginModal__incorrect-input ';
  const validInput = 'ModalWithForm__input';
  const validInputLabel = 'ModalWithForm__input-label';

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  //Resetting the form values whenever the modal is closed
  useEffect(() => {
    if (!isLoginModalVisible) {
      resetForm();
    }
  }, [isLoginModalVisible]);

  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isFormModalVisible={isLoginModalVisible}
      onSubmit={handleSubmit}
      title="Log in"
      buttonText={isLoading ? 'Logging in...' : 'Log In'}
      name="log-in"
      isFormValid={isFormValid}
    >
      <label htmlFor="email" className={validInputLabel}>
        Email
      </label>
      <input
        type="email"
        className={validInput}
        placeholder="Email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        ref={emailRef}
        required
      />
      <label
        htmlFor="login-password"
        className={
          validationFailed ? failedValidationInputLabel : validInputLabel
        }
      >
        {validationFailed ? 'Incorrect Password' : 'Password'}
      </label>
      <input
        type="password"
        className={validationFailed ? failedValidationInput : validInput}
        placeholder="Password"
        id="login-password"
        name="password"
        minLength="8"
        maxLength="16"
        value={values.password}
        onChange={(e) => {
          handleChange(e);
          if (e.target.value.trim() === '') {
            setValidationFailed(false);
          }
        }}
        ref={passwordRef}
        required
      />
      <p
        className="Login__signup-link"
        onClick={() => {
          handleCloseModal();
          setIsSignupModalVisible(true);
        }}
      >
        {!isLoading ? ' or Sign Up' : ''}
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
