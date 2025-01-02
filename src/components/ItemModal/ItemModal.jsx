import { useContext } from "react";
import './ItemModal.css';
import { CurrentUserContext } from '../../contexts/AppContexts';

function ItemModal({ handleCloseModal, isImageModalVisible, data, handleItemDelete}) {

const { currentUser }  = useContext(CurrentUserContext);

// Checking if the current user is the owner of the current clothing item
const isOwn = data?.owner._id === currentUser._id;

// Creating a variable which then set in `className` for the delete button

  return (
    <div
      className="ItemModal"
      style={{ display: isImageModalVisible ? 'flex' : 'none' }}
    >
      <div className="ItemModal__container">
        <div className="ItemModal__image-container">
          <img src={data?.imageUrl} alt={data?.name} className="ItemModal__image" />
        </div>
        <span className='ItemModal__flex-span'><p className="ItemModal__item-name">{data?.name}</p> { isOwn && (<button className='ItemModal__delete-btn' onClick={() => handleItemDelete(data?._id)}> Delete item</button>) } </span>
        <p className="ItemModal__weather-type">Weather: {data?.weather}</p>
    
        <button
          type="button"
          className="ItemModal__close-btn"
          onClick={() => {
            handleCloseModal();
          }}
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
