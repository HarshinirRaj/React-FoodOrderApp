import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css"
import CartButton from "./CartButton";

const Header = (props) => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>Harshey's Kitchen</h1>
                <CartButton/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food"></img>
            </div>
        </React.Fragment>
    )
}

export default Header;