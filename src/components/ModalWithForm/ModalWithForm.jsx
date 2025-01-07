import './ModalWithForm.css';

function ModalWithForm({
  handleCloseModal,
  isFormModalVisible,
  onSubmit,
  children,
  title,
  buttonText,
  name,
  isFormValid,
}) {
  return (
    <div
      className={`ModalWithForm  ModalWithForm_type_${name}`}
      style={{ display: isFormModalVisible ? 'flex' : 'none' }}
    >
      <form
        className={`ModalWithForm__form ModalWithForm__form_type_${name}`}
        onSubmit={onSubmit}
      >
        <p className="ModalWithForm__form-title">{title}</p>
        <button
          type="button"
          className="ModalWithForm__close-btn"
          onClick={() => {
            handleCloseModal();
          }}
        />
        {children}
        <button type="submit" className={isFormValid? "ModalWithForm__submit-button" : "ModalWithForm__submit-button-disabled" } >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
