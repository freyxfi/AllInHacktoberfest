import React from "react";
import "./modal.scss";

const Modal = ({ children, title }) => {
    return (
        <div className='modal__container'>
            <div className='modal'>
                <div className='modal__title'>{title}</div>
                <div className='modal__content'>{children}</div>
                {/* <div className='modal__footer'>Footer</div> */}
            </div>
        </div>
    );
};

export default Modal;
