import React, { useContext } from "react";
import PropTypes from "prop-types";
import blueCard from "../../assets/card.png";
import greenCard from "../../assets/card-2.png"
import brownCard from "../../assets/card-3.png"
import { robot1, robot2, robot3, robot4, robot5, robot6, robot7, robot8 } from "../../assets/robots";
import { pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8 } from "../../assets/pokemon";
import { dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8 } from "../../assets/dogs";
import { ThemeContext } from "../../ThemeContext";

import "./Card.scss";

const getImage = (type) => {
    let image = "";

    switch (type) {
        case "red":
            image = robot1;
            break;
        case "yellow":
            image = robot2;
            break;
        case "purple":
            image = robot3;
            break;
        case "green":
            image = robot4;
            break;
        case "grey":
            image = robot5;
            break;
        case "pink":
            image = robot6;
            break;
        case "brown":
            image = robot7;
            break;
        case "blue":
            image = robot8;
            break;
        case "bulbasaur":
            image = pokemon1;
            break;
        case "charizard":
            image = pokemon2;
            break;
        case "squirtle":
            image = pokemon3;
            break;
        case "butterfree":
            image = pokemon4;
            break;
        case "psyduck":
            image = pokemon5;
            break;
        case "pikachu":
            image = pokemon6;
            break;
        case "jigglypuff":
            image = pokemon7;
            break;
        case "meowth":
            image = pokemon8;
            break;
        case "lhasa":
            image = dog1;
            break;
        case "eskimo":
            image = dog2;
            break;
        case "ridgeback":
            image = dog3;
            break;
        case "german":
            image = dog4;
            break;
        case "mastiff":
            image = dog5;
            break;
        case "terrier":
            image = dog6;
            break;
        case "bulldog":
            image = dog7;
            break;
        case "rottweiler":
            image = dog8;
            break;
        default:
            image = "";
    }

    return image;
};

const getCardImage = (theme) => {
    let image = "";
    if (theme === 'blue') {
        image = blueCard;
    } else if (theme === 'green') {
        image = greenCard;
    } else {
        image = brownCard;
    }
    return image;
};

const Card = ({
    id,
    type,
    flipped,
    solved,
    height,
    width,
    onClick,
    disabled,
}) => {
    const { theme } = useContext(ThemeContext);

    let frontImage = getImage(type);

    let cardImage = getCardImage(theme)

    return (
        <div
            className={`card__container ${flipped ? "flipped" : ""}`}
            style={{ width, height }}
            onClick={() => (disabled ? null : onClick(id))}>
            <div className='flipper'>
                {/* <img
                    className='card__border-top'
                    src={border}
                    width='50%'
                    alt='border'
                />
                <img
                    className='card__border-bottom'
                    src={border}
                    width='50%'
                    alt='border'
                />
                <img
                    className='card__icon'
                    src={icon}
                    width='50%'
                    alt='border'
                /> */}
                <img
                    alt='card'
                    height={height}
                    className={flipped ? "card__front" : "card__back"}
                    width={width}
                    src={flipped || solved ? frontImage : cardImage}
                />
            </div>
        </div>
    );
};

Card.prototype = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default Card;
