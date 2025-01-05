import { useEffect } from 'react';
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
}) {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const { validationFailed } = useContext(AuthenticationContext);
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
      buttonText={'Log in '}
      name="log-in"
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
        maxLength="50"
        value={values.email}
        onChange={handleChange}
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
        maxLength="20"
        value={values.password}
        onChange={handleChange}
        required
      />
      <p
        className="Login__signup-link"
        onClick={() => {
          handleCloseModal();
          setIsSignupModalVisible(true);
        }}
      >
        or Sign Up
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
