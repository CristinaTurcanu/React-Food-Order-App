import React, {useContext, useEffect, useState} from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartContext = useContext(CartContext)

    const {items} = cartContext

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
    const numberOfCartItems = items.reduce((prevValue, item) => {
        return prevValue + item.amount
    }, 0)

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)
        const timerId = setTimeout(() => {
            setBtnIsHighlighted(false)
        },300)

        return () => {
            clearTimeout(timerId)
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton;