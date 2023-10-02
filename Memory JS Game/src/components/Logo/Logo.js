import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo1 from "../../assets/logo.png";
import Logo2 from "../../assets/logo-2.png";
import Logo3 from "../../assets/logo-3.png";
import { ThemeContext } from "../../ThemeContext";

const Logo = ({ width }) => {
    const [logo, setLogo] = useState(Logo1);
    const { theme } = useContext(ThemeContext);

    const getLogo = () => {
        if (theme === 'brown') {
            setLogo(Logo3);
        } else if (theme === 'green') {
            setLogo(Logo2);
        } else {
            setLogo(Logo1);
        }
    };

    useEffect(() => {
        getLogo();
    }, [theme]);

    return (
        <Link to="/">
            <div className='header__logo'>
                <img src={logo} alt='Logo' width={width} />
            </div>
        </Link>
    );
};

Logo.defaultProps = {
    width: "280px",
};

export default Logo;
