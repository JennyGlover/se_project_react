import {useContext, useEffect, useState} from "react";
import { Navigate, } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css"
import { CurrentUserContext } from '../../contexts/AppContexts';
import useForm from "../../hooks/useForm";

function EditProfileModal({isEditProfileModalVisible, handleCloseModal, handleEditProfile, isLoading, setIsEditProfileModalVisible}) {

 const {currentUser}  = useContext(CurrentUserContext);
  const { values, handleChange, setValues} = useForm({
  name: currentUser?.name,
  avatar: currentUser?.avatar,
});

    const handleSubmit= (e) => {
        e.preventDefault();
        handleEditProfile(values);
       }


  useEffect(() =>{
    if (currentUser){
        setValues({name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [currentUser, setValues])

    return(
  <ModalWithForm
        handleCloseModal={handleCloseModal}
        isFormModalVisible={isEditProfileModalVisible}
        onSubmit={handleSubmit}
        title="Edit Profile"
        buttonText={isLoading? "Saving..." : "Save"}
        name="log-in"
      >
        <label htmlFor="owner-name" className="ModalWithForm__input-label">
          Name
        </label>
        <input
          type="text"
          className="ModalWithForm__input"
          placeholder="name"
          id="owner-name"
          name="name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <label htmlFor="owner-avatar" className="ModalWithForm__input-label">
         Avatar
        </label>
        <input
          type="url"
          className="ModalWithForm__input"
          placeholder="Image Url"
          id="owner-avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </ModalWithForm>
    )
}

export default EditProfileModal;