import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';


function Profile({defaultClothingItems, handleCardClick, handleAddButtonClick }){

    return (
        <div className='Profile'>
        <Sidebar />
        <ClothesSection  defaultClothingItems={defaultClothingItems} handleCardClick={handleCardClick} handleAddButtonClick={handleAddButtonClick}/>
        </div>
    )
    
}

export default Profile;