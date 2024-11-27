import './itemModal.css';
import shirt from '../../assets/shirt.png';

function ItemModal({ onClose, isImageModalVisible, data }) {
  return (
    <div
      className="itemModal"
      style={{ display: isImageModalVisible ? 'flex' : 'none' }}
    >
      <div className="itemModal__container">
        <div className="itemModal__image-container">
          <img src={data?.link} alt={data?.name} className="itemModal__image" />
        </div>
        <p className="itemModal__item-name">{data?.name}</p>
        <p className="itemModal__weather-type">Weather: {data?.weather}</p>
        <button
          type="button"
          className="itemModal__close-btn"
          onClick={() => {
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
