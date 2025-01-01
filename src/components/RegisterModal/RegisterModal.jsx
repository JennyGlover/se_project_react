import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css"
import useForm from "../../hooks/useForm";

function RegisterModal({isFormModalVisible, handleCloseModal, handleRegistration, isLoading}) {
    
  const { values, handleChange, resetForm } = useForm({
  email: "",
  password: "",
  name: "",
  avatar: "",
});

    const handleSubmit= (e) => {
        e.preventDefault();
        handleRegistration(values);
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
        buttonText={isLoading? "Loading..." : "Next"}
        name="log-in"
      >
        <label htmlFor="registration-email" className="ModalWithForm__input-label">
          Email*                 
        </label>
        <input
          type="email"
          className="ModalWithForm__input"
          placeholder="Email"
          id="registration-email"
          minLength="1"
          maxLength="30"
          name="email"
          value={values.email}
          onChange={handleChange}
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
        />
        
        <label htmlFor="username" className="ModalWithForm__input-label">
         Name*
        </label>
        <input
          type="text"
          className="ModalWithForm__input"
          placeholder="Password"
          id="username"
          name="password"
          minLength="8"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
        />

        <label htmlFor="avatar" className="ModalWithForm__input-label">
         Avatar URL*
        </label>
        <input
          type="url"
          className="ModalWithForm__input"
          placeholder="Image Url"
          id="avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </ModalWithForm>
    )
}

export default RegisterModal;        