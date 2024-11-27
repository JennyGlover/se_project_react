import './ModalWithForm.css';


function ModalWithForm({onClose, isFormModalVisible}){



    return(
       
        <div className="ModalWithForm" style={{display: isFormModalVisible? 'flex': 'none'}}>

            <form action="" className="ModalWithForm__form">
                <p className="ModalWithForm__form-title">New garment</p>
                <button type="button" className="ModalWithForm__close-btn" onClick={()=>{
                    onClose();
                }}></button>
                <label htmlFor="mame" className="ModalWithForm__input-label">Name</label>
                <input type="text" className="ModalWithForm__input" placeholder='Name' id='name'/>
                <label htmlFor="image" className="ModalWithForm__input-label">Image</label>
                <input type="text" className="ModalWithForm__input" placeholder='Image URL' id='image'/>
                <label htmlFor="weather-type" className="ModalWithForm__input-label">Select the Weather type:</label>
                <select className="ModalWithForm__input" placeholder='Image URL' id='weather-selector'>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                </select>
                
                <button type='submit' className="ModalWithForm__submit-button">Add garment</button>
            </form>
        </div>
        
    )
}

export default ModalWithForm;
