import React from "react";
import './modal.css'
 
type TmodalProps={
    isOpen:boolean,
    onClose?:()=>void,
    children:JSX.Element;
}

const Modal:React.FC<TmodalProps> = ({ isOpen, onClose, children, }) => {
    if (!isOpen) return null;
 
    return (
        <div
            onClick={onClose}
            className="modal-container"
>
            <div
               className="modal"
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;