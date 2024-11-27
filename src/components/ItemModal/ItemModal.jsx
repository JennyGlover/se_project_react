import './ItemModal.css';
import shirt from '../../assets/shirt.png';

function ItemModal({ onClose, isImageModalVisible, data }) {
  return (
    <div
      className="ItemModal"
      style={{ display: isImageModalVisible ? 'flex' : 'none' }}
    >
      <div className="ItemModal__container">
        <div className="ItemModal__image-container">
          <img src={data?.link} alt="" className="ItemModal__image" />
        </div>
        <p className="ItemModal__item-name">{data?.name}</p>
        <p className="ItemModal__weather-type">Weather: {data?.weather}</p>
        <button
          type="button"
          className="ItemModal__close-btn"
          onClick={() => {
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
