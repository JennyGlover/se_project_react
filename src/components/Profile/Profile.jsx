import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';


function Profile({clothingItems, handleCardClick, handleAddButtonClick, handleEditProfileClick}){

    return (
        <div className='Profile'>
        <Sidebar handleEditProfileClick={handleEditProfileClick}  />
        <ClothesSection  clothingItems={clothingItems} handleCardClick={handleCardClick} handleAddButtonClick={handleAddButtonClick} />
        </div>
    )
    
}

export default Profile;