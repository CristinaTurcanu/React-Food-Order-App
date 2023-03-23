import React, {Fragment} from "react";
import classes from "./Header.module.css"
import foodImg from "../../assets/food.jpg"
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>ReactFood</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={foodImg} alt="Food"/>
        </div>
    </Fragment>

}
export default Header;