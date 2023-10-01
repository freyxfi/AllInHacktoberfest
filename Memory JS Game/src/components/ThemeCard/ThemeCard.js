import React from "react";
import { robot8 } from "../../assets/robots";
import { pokemon6 } from "../../assets/pokemon";
import { dog9 } from "../../assets/dogs";
import "./themeCard.scss";

const ThemeCard = ({ type, imageWidth, onClick, active }) => {
    let selected = active === type ? "active" : "";
    let image = "";
    let bgColor = "";

    if (type === "Pokemon") {
        image = pokemon6;
        bgColor = "green";
    } else if (type === "Dogs") {
        image = dog9;
        bgColor = "brown";
    } else {
        image = robot8;
        bgColor = "blue";
    }

    return (
        <div
            onClick={onClick}
            className={`themeBox themeBox--${bgColor} ${selected}`}>
            <div>
                <img src={image} alt={type} width={imageWidth} />
            </div>
            <div>{type}</div>
        </div>
    );
};

ThemeCard.defaultProps = {
    imageWidth: "100%",
};

export default ThemeCard;
