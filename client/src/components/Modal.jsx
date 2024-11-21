import React from 'react';
import {Pencil , UserPen, ListRestart} from "lucide-react"
const ShopModal = ({ isOpen, onClose, shop }) => {
  const modalRef = React.useRef(null);  // Reference to the modal

  // Show or close the modal based on the `isOpen` prop
  React.useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  // Conditionally apply class for amountDue
  const amountDueClass = shop.amountDue > 0 ? 'text-red-500' : 'text-green-500';

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
      <div className="bg-slate-200 rounded-2xl p-10 w-max">
        <h3 className="font-bold text-4xl my-3 underline">Shop Details :</h3>
        <p className='text-5xl font-light mb-4'>Shop Number : {shop.shopNumber}</p>
        <p className='text-5xl font-light mb-4'>Shop Name : {shop.shopName}</p>
        <p className='text-5xl font-light mb-4'>Amount Paid : {shop.amountPaid}</p>
        <p className='text-5xl font-light mb-4'>Amount Due : <span className={amountDueClass}>{shop.amountDue}</span></p>
        <p className='text-5xl font-light mb-10'>Total Amount : {shop.totalAmount}</p>
        
        <h3 className="font-bold text-4xl my-3 underline">Owner Details :</h3>
        <p className='text-5xl font-light mb-4'>Owner Name: {shop.owner.name}</p>
        <p className='text-5xl font-light mb-4'>Contact : {shop.owner.number}</p>
        <p className='text-5xl font-light mb-4'>Email : {shop.owner.email}</p>
        <p className='text-5xl font-light mb-4'>Address : {shop.owner.address}</p>
        <p className='text-5xl font-light mb-4'>Shops Owned : {Array.isArray(shop.shopsOwned) && shop.shopsOwned.length > 0 ? shop.shopsOwned.join(', ') : 'None'}</p>

        <form method="dialog" className="modal-backdrop flex justify-evenly">
          <button type="button" onClick={onClose} className="btn mt-6 btn-primary">
            <Pencil strokeWidth={2} size={30}/>
          </button>
          <button type="button" onClick={onClose} className="btn mt-6 btn-primary">
            <UserPen strokeWidth={2} size={30}/>
          </button>
          <button type="button" onClick={onClose} className="btn mt-6 btn-primary">
            <ListRestart strokeWidth={2} size={30}/>
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ShopModal;
