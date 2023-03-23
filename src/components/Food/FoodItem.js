import React, {useContext} from "react";
import classes from "./FoodItem.module.css"
import FoodItemForm from "./FoodItemForm";
import CartContext from "../../store/cart-context";

const FoodItem = (props) => {
    const {name, id, description, price} = props
    const cartContext = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartContext.addItem({id, name, description, price, amount})
    }
    return <li className={classes.food}>
        <div>
            <h3>{name}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>${price}</div>
        </div>
        <div>
            <FoodItemForm id={id} onAddToCart={addToCartHandler}/>
        </div>
    </li>
}
export default FoodItem