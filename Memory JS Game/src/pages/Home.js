import React from "react";
import history from ".././history";
import { Modal, Button } from "../components";

const Home = () => {
    return (
        <main>
            <Modal title='Welcome'>
                <Button onClick={() => history.push("/theme")}>
                    Start Game
                </Button>

                <Button
                    marginTop='1.5rem'
                    onClick={() => history.push("/instructions")}>
                    Instructions
                </Button>
            </Modal>
        </main>
    );
};

export default Home;
