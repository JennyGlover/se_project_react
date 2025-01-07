import { useContext, useEffect, useRef } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditProfileModal.css';
import { CurrentUserContext } from '../../contexts/AppContexts';
import useForm from '../../hooks/useForm';

function EditProfileModal({
  isEditProfileModalVisible,
  handleCloseModal,
  handleEditProfile,
  isLoading,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: currentUser?.name,
    avatar: currentUser?.avatar,
  });

  const nameRef = useRef();
  const imageUrlRef = useRef();

  const isFormValid = Object.values(values).every((value, index) => {
    const input = [nameRef.current, imageUrlRef.current][index];
    return value.trim() !== '' && input?.validity.valid;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  useEffect(() => {
    if (currentUser) {
      setValues({ name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [currentUser, setValues]);

  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isFormModalVisible={isEditProfileModalVisible}
      onSubmit={handleSubmit}
      title="Edit Profile"
      buttonText={isLoading ? 'Saving...' : 'Save'}
      name="log-in"
      isFormValid={isFormValid}
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
        ref={nameRef}
        required
      />
      <label htmlFor="owner-avatar" className="ModalWithForm__input-label">
        Avatar
      </label>
      <input
        type="url"
        className="ModalWithForm__input EditProfileModal__input"
        placeholder="Image Url"
        id="owner-avatar"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        ref={imageUrlRef}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
