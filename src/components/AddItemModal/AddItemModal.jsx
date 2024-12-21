import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './AddItemModal.css';
import useForm from "../../hooks/useForm";

function AddItemModal({isFormModalVisible, handleCloseModal, handleAddItemSubmit, isLoading}) {
    
  const { values, handleChange, resetForm } = useForm({
  name: "",
  link: "",
  weather: "",
});

    const handleSubmit= (e) => {
        e.preventDefault();
        handleAddItemSubmit(values);
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
        title="New garment"
        buttonText={isLoading? "Saving..." : "Add Garment "}
        name="add-garment"
      >
        <label htmlFor="mame" className="ModalWithForm__input-label">
          Name
        </label>
        <input
          type="text"
          className="ModalWithForm__input"
          placeholder="Name"
          id="name"
          minLength="1"
          maxLength="30"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <label htmlFor="image" className="ModalWithForm__input-label">
          Image
        </label>
        <input
          type="url"
          className="ModalWithForm__input"
          placeholder="Image URL"
          id="image"
          name="link"
          minLength="1"
          value={values.link}
          onChange={handleChange}
        />

        <fieldset className="ModalWithForm__radio-buttons" >
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
            />
            <span>Warm</span>
          </label>
          <label className="ModalWithForm__radio" htmlFor="weather-cold">
            <input
              type="radio"
              name="weather"
              value="cold"
              id="weather-cold"
              className="ModalWithForm__radio-input"
              checked={values.weather === 'cold'}
              onChange={handleChange}
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    )
}

export default AddItemModal;