import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/AppContexts';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';


function Profile({clothingItems, handleCardClick, handleAddButtonClick, handleEditProfileClick}){

 const { currentUser }  = useContext(CurrentUserContext);
 const [ user, setUser ] = useState(currentUser);

  useEffect(() => {
    if(currentUser){
      setUser(currentUser)
    }
   }, [currentUser])

    return (
        <div className='Profile'>
        <Sidebar handleEditProfileClick={handleEditProfileClick}  />
        <ClothesSection  clothingItems={clothingItems} handleCardClick={handleCardClick} handleAddButtonClick={handleAddButtonClick} />
        </div>
    )
    
}

export default Profile;