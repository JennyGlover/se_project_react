import './itemCard.css';
function ItemCard({ data, handleCardClick }) {
  return (
    <div
      className="itemCard"
      onClick={() => {
        handleCardClick(data);
      }}
    >
      <p className="itemCard__title">{data.name}</p>
      <img src={data.link} className="itemCard__item" alt={data.name} />
    </div>
  );
}

export default ItemCard;
