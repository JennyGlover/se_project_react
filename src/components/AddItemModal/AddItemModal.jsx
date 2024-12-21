import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({isFormModalVisible, handleCloseModal, handleAddItemSubmit}) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [weather, setWeather] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleLinkChange = (e) =>{
        setLink(e.target.value)
    }

    const handleWeatherTypeChange = (e) => {
        setWeather(e.target.value)
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setName('');
       setLink('');
       setWeather('');
        handleAddItemSubmit({name, link, weather })
        handleCloseModal();
    }

    return(
  <ModalWithForm
        handleCloseModal={handleCloseModal}
        isFormModalVisible={isFormModalVisible}
        onSubmit={handleSubmit}
        title="New garment"
        buttonText="Add garment"
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
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
        />

        <fieldset className="ModalWithForm__radio-buttons" onChange={handleWeatherTypeChange}>
          <legend className="ModalWithForm__legend">
            Select the Weather type:
          </legend>
          <label className="ModalWithForm__radio" htmlFor="weather-hot">
            <input
              type="radio"
              name="weatherType"
              value="hot"
              id="weather-hot"
              className="ModalWithForm__radio-input"
            />
            <span>Hot</span>
          </label>
          <label className="ModalWithForm__radio" htmlFor="weather-warm">
            <input
              type="radio"
              name="weatherType"
              value="warm"
              id="weather-warm"
              className="ModalWithForm__radio-input"
            />
            <span>Warm</span>
          </label>
          <label className="ModalWithForm__radio" htmlFor="weather-cold">
            <input
              type="radio"
              name="weatherType"
              value="cold"
              id="weather-cold"
              className="ModalWithForm__radio-input"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    )
}

export default AddItemModal;