import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';
import useForm from "../../hooks/useForm";

function LoginModal({isFormModalVisible, handleCloseModal, handleLogin, isLoading}) {
    
  const { values, handleChange, resetForm } = useForm({
  email: "",
  password: "",
});

    const handleSubmit= (e) => {
        e.preventDefault();
        handleLogin(values);
    }

  //Resetting the form values whenever the modal is closed
    useEffect(() => {
      if (!isFormModalVisible){
        resetForm();
      }
    }, [isFormModalVisible]);

    return(
  <ModalWithForm
        handleCloseModal={handleCloseModal}
        isFormModalVisible={isFormModalVisible}
        onSubmit={handleSubmit}
        title="Log in"
        buttonText={isLoading? "Loging in..." : "Log in "}
        name="log-in"
      >
        <label htmlFor="email" className="ModalWithForm__input-label">
          Email
        </label>
        <input
          type="email"
          className="ModalWithForm__input"
          placeholder="Email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="login-password" className="ModalWithForm__input-label">
         Password
        </label>
        <input
          type="password"
          className="ModalWithForm__input"
          placeholder="Password"
          id="login-password"
          name="password"
          minLength="8"
          maxLength="14"
          value={values.password}
          onChange={handleChange}
        />
      </ModalWithForm>
    )
}

export default LoginModal;