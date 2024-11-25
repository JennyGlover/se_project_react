import './ItemCard.css';
function ItemCard({data}){
    
    return(
      <div className="ItemCard" >
        <p className="ItemCard__title">{data.name}</p>
       <img src={data.link} className='ItemCard__item' alt={data.name} />
      </div>
    )
}

export default ItemCard;