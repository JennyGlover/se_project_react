import './ItemModal.css';
import shirt from '../../assets/shirt.png';

function ItemModal({ handleCloseModal, isImageModalVisible, data, handleItemDelete}) {
  return (
    <div
      className="ItemModal"
      style={{ display: isImageModalVisible ? 'flex' : 'none' }}
    >
      <div className="ItemModal__container">
        <div className="ItemModal__image-container">
          <img src={data?.link} alt={data?.name} className="ItemModal__image" />
        </div>
        <span className='ItemModal__flex-span'><p className="ItemModal__item-name">{data?.name}</p> <button className='ItemModal__delete-btn' onClick={() => handleItemDelete(data?._id)}> Delete item</button></span>
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
