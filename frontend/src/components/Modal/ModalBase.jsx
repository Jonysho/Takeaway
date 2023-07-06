import React from 'react';

const ModalBase = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen ?
        <div className="fixed inset-0 flex items-center justify-center z-[9999] opacity-100 ease-in-out duration-500">
          <div className="fixed inset-0 bg-[rgb(57,51,54,.8)]" onClick={closeModal}></div>
          <div className="bg-neutral-100 sm:rounded-lg z-[10000] max-h-screen sm:max-h-[90vh] w-screen sm:w-[70vh] overflow-y-auto">
            {children}
          </div>
        </div> :
        <div className='opacity-0'></div>
      }  
    </>
  );
};

export default ModalBase;
