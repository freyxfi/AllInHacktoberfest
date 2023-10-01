import React from "react";
import "./loader.scss";
import loader from "../../assets/loader.gif";


const Loader = () => {
    return (
        <div className="loader__container">
            <img src={loader} alt='Loader' height='100px' width='100px' />
        </div>
    );
};

export default Loader;