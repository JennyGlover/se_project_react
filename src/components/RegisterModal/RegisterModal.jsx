import { useEffect, useContext, useRef } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { AuthenticationContext } from '../../contexts/AppContexts';
import useForm from '../../hooks/useForm';
import './RegisterModal.css';

function RegisterModal({
  isSignupModalVisible,
  handleCloseModal,
  handleRegistration,
  setIsLoginModalVisible,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
    avatar: '',
  });
  const { validationFailed } = useContext(AuthenticationContext);
  const failedValidationInputLabel =
    'ModalWithForm__input-label RegistrationModal__incorrect-input';
  const failedValidationInput =
    'ModalWithForm__input RegistrationModal__incorrect-input ';
  const validInput = 'ModalWithForm__input';
  const validInputLabel = 'ModalWithForm__input-label';
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const avatarRef = useRef();
     
     const isFormValid = Object.values(values).every((value, index) =>{
       const input =  [emailRef.current, passwordRef.current, nameRef.current, avatarRef.current][index];;
       return value.trim() !== "" && input?.validity.valid
     } );
  

  //Resetting the form values whenever the modal is closed
  useEffect(() => {
    if (!isSignupModalVisible) {
      resetForm();
    }
  }, [isSignupModalVisible]);

  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isFormModalVisible={isSignupModalVisible}
      onSubmit={handleSubmit}
      title="Sign Up"
      buttonText={'Next'}
      name="log-in"
      isFormValid={isFormValid}
    >
      <label
        htmlFor="registration-email"
        className={
          validationFailed ? failedValidationInputLabel : validInputLabel
        }
      >
        {validationFailed ? 'Invalid Email*' : 'Email*'}
      </label>
      <input
        type="email"
        className={validationFailed ? failedValidationInput : validInput}
        placeholder="Email"
        id="registration-email"
        minLength="1"
        maxLength="30"
        name="email"
        value={values.email}
        onChange={handleChange}
        ref={emailRef}
        required
      />

      <label htmlFor="password" className="ModalWithForm__input-label">
        Password*
      </label>
      <input
        type="password"
        className="ModalWithForm__input"
        placeholder="Password"
        id="password"
        name="password"
        minLength="8"
        maxLength="14"
        value={values.password}
        onChange={handleChange}
        ref={passwordRef}
        required
      />

      <label htmlFor="username" className="ModalWithForm__input-label">
        Name*
      </label>
      <input
        type="text"
        className="ModalWithForm__input"
        placeholder="Name"
        id="username"
        name="name"
        minLength="8"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
        ref={nameRef}
        required
      />

      <label htmlFor="avatar" className="ModalWithForm__input-label ">
        Avatar URL*
      </label>
      <input
        type="url"
        className="ModalWithForm__input RegisterModal__input"
        placeholder="Image Url"
        id="avatar"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        ref={avatarRef}
        required
      />
      <p
        className="Register__signup-link"
        onClick={() => {
          handleCloseModal();
          setIsLoginModalVisible(true);
        }}
      >
        or Login
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
