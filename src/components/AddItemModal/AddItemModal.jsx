import { useEffect, useRef } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './AddItemModal.css';
import useForm from '../../hooks/useForm';

function AddItemModal({
  isAddItemModalVisible,
  handleCloseModal,
  handleAddItemSubmit,
  isLoading,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    imageUrl: '',
    weather: '',
  });

  const nameRef = useRef();
  const imageUrlRef = useRef();
  const weatherHotRef = useRef();
  const weatherWarmRef = useRef();
  const weatherColdRef = useRef();

  const isFormValid = Object.values(values).every((value, index) => {
    const input = [
      nameRef.current,
      imageUrlRef.current,
      weatherHotRef.current,
      weatherWarmRef.current,
      weatherColdRef.current,
    ][index];
    return value.trim() !== '' && input?.validity.valid;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit(values);
    console.log(values);
  };

  //Resetting the form values whenever the modal is closed
  useEffect(() => {
    if (!isAddItemModalVisible) {
      resetForm();
    }
  }, [isAddItemModalVisible]);

  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isFormModalVisible={isAddItemModalVisible}
      onSubmit={handleSubmit}
      title="New garment"
      buttonText={'Add Garment '}
      name="add-garment"
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="ModalWithForm__input-label">
        Name
      </label>
      <input
        type="text"
        className="ModalWithForm__input"
        placeholder="Name"
        id="name"
        minLength="2"
        maxLength="30"
        name="name"
        value={values.name}
        onChange={handleChange}
        ref={nameRef}
        required
      />
      <label htmlFor="imageUrl" className="ModalWithForm__input-label">
        Image
      </label>
      <input
        type="url"
        className="ModalWithForm__input"
        placeholder="Image URL"
        id="imageUrl"
        name="imageUrl"
        minLength="1"
        value={values.imageUrl}
        onChange={handleChange}
        ref={imageUrlRef}
        required
      />

      <fieldset className="ModalWithForm__radio-buttons">
        <legend className="ModalWithForm__legend">
          Select the Weather type:
        </legend>
        <label className="ModalWithForm__radio" htmlFor="weather-hot">
          <input
            type="radio"
            name="weather"
            value="hot"
            id="weather-hot"
            className="ModalWithForm__radio-input"
            checked={values.weather === 'hot'}
            onChange={handleChange}
            ref={weatherHotRef}
            required
          />
          <span>Hot</span>
        </label>
        <label className="ModalWithForm__radio" htmlFor="weather-warm">
          <input
            type="radio"
            name="weather"
            value="warm"
            id="weather-warm"
            className="ModalWithForm__radio-input"
            checked={values.weather === 'warm'}
            onChange={handleChange}
            ref={weatherWarmRef}
            required
          />
          <span>Warm</span>
        </label>
        <label
          className="ModalWithForm__radio AddItemModal__radio"
          htmlFor="weather-cold"
        >
          <input
            type="radio"
            name="weather"
            value="cold"
            id="weather-cold"
            className="ModalWithForm__radio-input"
            checked={values.weather === 'cold'}
            onChange={handleChange}
            ref={weatherColdRef}
            required
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
