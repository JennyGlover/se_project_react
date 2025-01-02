import { useEffect} from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './AddItemModal.css';
import useForm from "../../hooks/useForm";

function AddItemModal({isAddItemModalVisible, handleCloseModal, handleAddItemSubmit, isLoading}) {
    
  const { values, handleChange, resetForm } = useForm({
  name: "",
  imageUrl: "",
  weather: "",
});

    const handleSubmit= (e) => {
        e.preventDefault();
        handleAddItemSubmit(values);
        console.log(values);
    }

  //Resetting the form values whenever the modal is closed
    useEffect(() => {
      if (!isAddItemModalVisible){
        resetForm();
      }
    }, [isAddItemModalVisible]);

    return(
  <ModalWithForm
        handleCloseModal={handleCloseModal}
        isFormModalVisible={isAddItemModalVisible}
        onSubmit={handleSubmit}
        title="New garment"
        buttonText={isLoading? "Saving..." : "Add Garment "}
        name="add-garment"
      >
        <label htmlFor="name" className="ModalWithForm__input-label">
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