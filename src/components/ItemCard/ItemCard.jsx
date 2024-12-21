import './ItemCard.css';
function ItemCard({ data, handleCardClick }) {
  return (
    <div
      className="ItemCard"
      onClick={() => {
        handleCardClick(data);
      }}
    >
      <p className="ItemCard__title">{data.name}</p>
      <div><img src={data.link} className="ItemCard__item" alt={data.name} /></div>
      
    </div>
  );
}

export default ItemCard;
