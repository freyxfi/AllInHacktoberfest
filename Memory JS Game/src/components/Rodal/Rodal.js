import React from "react";
import Rodal from 'rodal';
import { GiBackstab, GiSandsOfTime, GiCardJoker, GiTrophy } from "react-icons/gi";
import 'rodal/lib/rodal.css';
import "./rodal.scss";
import history from "../../history";
import { Button } from "..";

const BootstrapModal = (props) => {
    return (
        <Rodal {...props} closeOnEsc={false} closeMaskOnClick={false} showCloseButton={false} className="rodal__container" height={310}>
            <div className="rodal__title">
                Game Over
            </div>
            <div className="rodal__content">
                <div>{(props.victory) ? (<> <GiTrophy /> YOU WIN!! </>) : (<> <GiBackstab /> YOU LOSE!! </>)} </div>
                <div><GiSandsOfTime /> Time Taken: {100 - props.time} sec</div>
                <div><GiCardJoker /> Cards Flipped: {props.flips}</div>
            </div>
            <div className="rodal__btn-container">
                <Button marginTop="1rem" onClick={() => history.push('/theme')} >Back</Button>
                <Button onClick={() => props.onPlayAgain()} >Play again</Button>
            </div>
        </Rodal>
    );
};

export default BootstrapModal;