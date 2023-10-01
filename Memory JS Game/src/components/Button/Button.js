import React from "react";
import "./Button.scss";

const Button = ({ children, onClick, marginTop }) => {
    return (
        <button
            style={{ marginTop: `${marginTop}` }}
            onClick={onClick}
            className='btn--primary'>
            {children}
        </button>
    );
};

export default Button;
