import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "../../styles/global.scss";
import history from "../../history";
import { Home, Instructions, ChooseTheme, GamePage } from "../../pages";
import { Header, Footer, Loader } from "../../components";
import { ThemeContext } from "../../ThemeContext";
import useTheme from "../../useTheme";
import imageArray from "../../preloadImages";

const App = () => {
    const [theme, setTheme] = useTheme("blue", "Theme");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        preloadImage();

        const getTheme = localStorage.getItem('Theme');
        // console.log(getTheme);
        if (getTheme === 'green') {
            setTheme('green');
        } else if (getTheme === 'brown') {
            setTheme('brown');
        } else {
            setTheme('blue');
        }

    }, []);

    const preloadImage = () => {
        setLoading(true);
        const images = imageArray();
        let length = images.length;
        images.forEach((picture) => {
            const img = new Image();
            img.src = picture;
            img.onload = () => {
                --length;
                if (length <= 0) {
                    setLoading(false);
                }
            };
        });
    };

    return (
        <Router history={history}>
            <div className={`theme-${theme}`}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <Header />
                    {(loading) ? (<Loader />) : (
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/instructions' component={Instructions} />
                            <Route path='/theme' component={ChooseTheme} />
                            <Route path='/game' component={GamePage} />
                        </Switch>
                    )}

                    <Footer />
                </ThemeContext.Provider>
            </div>
        </Router>
    );
};

export default App;
