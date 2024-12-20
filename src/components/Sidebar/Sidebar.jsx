import defaultAvatar from '../../assets/default-avatar.png';
import './Sidebar.css';

function Sidebar(){

    return(
     <div className='Sidebar'>
     <img className='Sidebar__avatar' src={defaultAvatar} alt="logo"/>
     <span className='Sidebar__username'>Terrence Tegegne </span>
     </div>


    )
    
}

export default Sidebar;