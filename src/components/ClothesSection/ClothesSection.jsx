import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({defaultClothingItems , handleCardClick, handleAddButtonClick }){
    
    return(
        <div className="ClothesSection">
         <span className="ClothesSection__title">Your Items</span> 
         <button className="ClothesSection__add-new-btn"   onClick={() => {
              handleAddButtonClick();
            }} >+ Add new</button>
         <div className='ClothesSection__item-cards'>
           {defaultClothingItems.map((item) => (
            <li key={item._id} className='ClothesSection__item-card'>
                <ItemCard
                  data ={item}
                  handleCardClick={handleCardClick}
                />
            </li>
           ) )}
         </div>
        </div>
    )
    
}

export default ClothesSection;