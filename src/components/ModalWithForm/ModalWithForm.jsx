import './ModalWithForm.css';

function ModalWithForm({
  handleCloseModal,
  isFormModalVisible,
  onSubmit,
  children,
  title,
  buttonText,
  name,
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
        <button type="submit" className="ModalWithForm__submit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
