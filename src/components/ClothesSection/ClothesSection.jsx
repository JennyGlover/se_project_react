import { useContext, useEffect} from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentUserContext } from '../../contexts/AppContexts';
import './ClothesSection.css';

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddButtonClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
 
 
  return (
    <div className="ClothesSection">
      <span className="ClothesSection__title">Your Items</span>
      <button
        className="ClothesSection__add-new-btn"
        onClick={() => {
          handleAddButtonClick();
        }}
      >
        + Add new
      </button>
      <div className="ClothesSection__item-cards">
        {clothingItems
          .filter((item) =>{
            return item.owner === currentUser._id
          }
            )  // Filter item that are owner's
          .map(
            (
              filteredItem, // Render filtered items
            ) => (
              <li key={filteredItem._id} className="ClothesSection__item-card">
                <ItemCard
                  data={filteredItem}
                  handleCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              </li>
            ),
          )}
      </div>
    </div>
  );
}

export default ClothesSection;
