import './ItemCard.css';
import shirt from '../../assets/shirt.png';

function ItemCard(){
    
    return(
      <div className="ItemCard" >
        <p className="ItemCard__title">T-shirt</p>
       <img src={shirt} className='ItemCard__item' alt="Clothing Item" />
      </div>
    )
}

export default ItemCard;