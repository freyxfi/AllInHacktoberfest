import React from "react";
import history from "../history";
import { Modal, Button } from "../components";

const Instructions = () => {
    return (
        <main>
            <Modal title='Instructions'>
                <ul
                    className='instruction__list'
                    style={{ fontSize: "1.8rem", paddingBottom: "3rem" }}>
                    <li>There will be 16 cards displayed on the screen.</li>
                    <li>Click on a card to flip it and memorize the picture.</li>
                    <li>You need to match the cards with same picture.</li>
                    <li>You will get 100 sec to find all the 8 pairs.</li>
                </ul>

                <Button marginTop='1.5rem' onClick={() => history.push("/")}>
                    Back
                </Button>
            </Modal>
        </main>
    );
};

export default Instructions;
