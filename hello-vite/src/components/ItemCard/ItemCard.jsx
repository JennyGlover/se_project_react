import './ItemCard.css';
function ItemCard({data,handleCardClick}){
    
    return(
      <div className="ItemCard"  onClick={() => {
       handleCardClick();
      }} >
        <p className="ItemCard__title">{data.name}</p>
       <img src={data.link} className='ItemCard__item' alt={data.name} />
      </div>
    )
}

export default ItemCard;