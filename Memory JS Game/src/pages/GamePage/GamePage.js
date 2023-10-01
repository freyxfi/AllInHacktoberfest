import React, { useState, useEffect, useContext } from "react";
import "./GamePage.scss";
import { Board, Rodal } from "../../components";
import { ThemeContext } from "../../ThemeContext";

const GamePage = () => {
    const [flipped, setFlipped] = useState([]);
    const [cards, setCards] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [flips, setFlips] = useState(0);
    const [seconds, setSeconds] = useState(100);
    const [isRunning, setIsRunning] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [victory, setVictory] = useState(false);

    const { theme } = useContext(ThemeContext);

    const shuffle = (array) => {
        const _array = array.slice(0);
        for (let i = 0; i < array.length - 1; i++) {
            let randomIndex = Math.floor(Math.random() * (i + 1));

            // Swapping values
            let temp = _array[i];
            _array[i] = _array[randomIndex];
            _array[randomIndex] = temp;
        }

        return _array;
    };

    const initDeck = () => {
        let id = 0;
        let cards = [];

        if (theme === 'blue') {
            cards = [
                "red",
                "yellow",
                "purple",
                "green",
                "grey",
                "pink",
                "brown",
                "blue",
            ].reduce((acc, type) => {
                acc.push({
                    id: id++,
                    type,
                });
                acc.push({
                    id: id++,
                    type,
                });
                return acc;
            }, []);
        } else if (theme === 'green') {
            cards = [
                "bulbasaur",
                "charizard",
                "squirtle",
                "butterfree",
                "psyduck",
                "pikachu",
                "jigglypuff",
                "meowth",
            ].reduce((acc, type) => {
                acc.push({
                    id: id++,
                    type,
                });
                acc.push({
                    id: id++,
                    type,
                });
                return acc;
            }, []);
        } else {
            cards = [
                "lhasa",
                "eskimo",
                "ridgeback",
                "german",
                "mastiff",
                "terrier",
                "bulldog",
                "rottweiler",
            ].reduce((acc, type) => {
                acc.push({
                    id: id++,
                    type,
                });
                acc.push({
                    id: id++,
                    type,
                });
                return acc;
            }, []);
        }

        return shuffle(cards);
    };

    useEffect(() => {
        setCards(initDeck());
    }, []);

    useEffect(() => {
        if (solved.length === 16) {
            setIsRunning(false);
            setVictory(true);
            setModalShow(true);
        }
    }, [solved])

    useEffect(() => {
        if (seconds === 0) {
            setIsRunning(false);
            if (solved.length !== 16) {
                setVictory(false);
            }
            setModalShow(true);
        }
    }, [seconds]);

    useEffect(() => {
        // console.log(isRunning);
        if (isRunning) {
            const id = window.setInterval(
                () => setSeconds((seconds) => seconds - 1),
                1000
            );
            setIntervalId(id);
        } else {
            // Clear set Interval
            window.clearInterval(intervalId);
        }
    }, [isRunning]);

    const onClick = (id) => {
        setDisabled(true);

        // If no cards flipped
        if (flipped.length === 0) {
            if (!sameCardClicked(id)) {
                setFlips((flips) => flips + 1);
            }
            setFlipped([id]);
            setDisabled(false);
            // At least flipped one
        } else {
            if (!sameCardClicked(id)) {
                setFlips((flips) => flips + 1);
            }

            if (sameCardClicked(id)) {
                setDisabled(false);
                return;
            };
            // if two cards flipped
            setFlipped([flipped[0], id]);

            // if we get a match
            if (isMatch(id)) {
                // ...solved = already solved | fliped[0] = first click | id = current clicked
                setSolved([...solved, flipped[0], id]);
                // Reset Cards
                setFlipped([]);
                setDisabled(false);

                // if not a match
            } else {
                setTimeout(() => {
                    // Reset Cards
                    setFlipped([]);
                    setDisabled(false);
                }, 2000);
            }
        }
    };

    const sameCardClicked = (id) => {
        return flipped.includes(id);
    };

    const isMatch = (id) => {
        const clickedCard = cards.find((card) => card.id === id);
        const flippedCard = cards.find((card) => flipped[0] === card.id);
        return flippedCard.type === clickedCard.type;
    };

    const playAgain = () => {
        setFlipped([]);
        setCards(initDeck());
        setSolved([]);
        setDisabled(false);
        setFlips(0);
        setSeconds(100);
        setIsRunning(true);
        setModalShow(false);
    }

    return (
        <>
            <main className='game__container'>
                <div className='game__stats'>
                    <div className='game__time'>Time: {seconds} sec</div>
                    <div className='game__flips'>Flips: {flips}</div>
                </div>
                <div className='game__cards-container'>
                    <Board
                        cards={cards}
                        flipped={flipped}
                        onClick={onClick}
                        disabled={disabled}
                        solved={solved}
                    />
                </div>
                <div>
                    <Rodal visible={modalShow} onClose={() => setModalShow(false)} time={seconds} flips={flips} onPlayAgain={playAgain} victory={victory} />
                </div>
            </main>
        </>
    );
};

export default GamePage;
