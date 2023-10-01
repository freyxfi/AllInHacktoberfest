import React, { useContext, useEffect } from "react";
import "./chooseTheme.scss";
import history from "../../history";
import { Modal, Button, ThemeCard } from "../../components";
import { ThemeContext } from "../../ThemeContext";
import useTheme from "../../useTheme";

const ChooseTheme = () => {
    const [active, setActive] = useTheme("Robots", "Active");
    const { setTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (active === "Robots") {
            localStorage.setItem('Theme', 'blue');
            localStorage.setItem('Active', 'Robots');
            setTheme("blue");
        } else if (active === "Pokemon") {
            localStorage.setItem('Theme', 'green');
            localStorage.setItem('Active', 'Pokemon');
            setTheme("green");
        } else {
            localStorage.setItem('Theme', 'brown');
            localStorage.setItem('Active', 'Dogs');
            setTheme("brown");
        }
    }, [active]);

    return (
        <main>
            <Modal title='choose a theme'>
                <div className='theme__container'>
                    <ThemeCard
                        type='Robots'
                        imageWidth='80%'
                        active={active}
                        onClick={() => setActive("Robots")}
                    />
                    <ThemeCard
                        type='Pokemon'
                        imageWidth='80%'
                        active={active}
                        onClick={() => setActive("Pokemon")}
                    />
                    <ThemeCard
                        type='Dogs'
                        active={active}
                        onClick={() => setActive("Dogs")}
                    />
                </div>
                <div className='theme__btn-container'>
                    <Button onClick={() => history.push("/")}>Back</Button>
                    <span className='theme__btn--start'>
                        <Button onClick={() => history.push("/game")}>
                            Start
                        </Button>
                    </span>
                </div>
            </Modal>
        </main>
    );
};

export default ChooseTheme;
