import './modalWithForm.css';

function ModalWithForm({
  onClose,
  isFormModalVisible,
  children,
  title,
  buttonText,
  name,
}) {
  return (
    <div
      className="modalWithForm"
      style={{ display: isFormModalVisible ? 'flex' : 'none' }}
    >
      <form
        action=""
        className={`modalWithForm__form modalWithForm__form_type_${name}`}
      >
        <p className="modalWithForm__form-title">{title}</p>
        <button
          type="button"
          className="modalWithForm__close-btn"
          onClick={() => {
            onClose();
          }}
        ></button>
        {children}
        <button type="submit" className="modalWithForm__submit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
