import React from 'react';

const ShopModal = ({ isOpen, onClose, description }) => {
  const modalRef = React.useRef(null);  // Reference to the modal

  // Show or close the modal based on the `isOpen` prop
  React.useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="my_modal_2"
      ref={modalRef}
      className="modal"
      onClick={(e) => {
        // Close modal if clicked outside
        if (e.target === modalRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Shop Description</h3>
        <p className="py-4">{description}</p>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={onClose} className="btn">
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ShopModal;
