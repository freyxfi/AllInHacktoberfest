import React from "react";
import PropTypes from "prop-types";
import { Card } from "../";
import "./board.scss";

const Board = ({ cards, flipped, onClick, disabled, solved }) => {
    return (
        <div className='board'>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    type={card.type}
                    width={130}
                    height={180}
                    flipped={flipped.includes(card.id)}
                    solved={solved.includes(card.id)}
                    onClick={onClick}
                    disabled={disabled || solved.includes(card.id)}
                /> // || so that not to click solved card
            ))}
        </div>
    );
};

Board.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default Board;
