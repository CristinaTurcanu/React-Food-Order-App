import React, {useContext, useState} from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout ] = useState(false)
    const [isSubmitting, setIsSubmitting ] = useState(false)
    const [didSubmit, setDidSubmit ] = useState(false)

    const cartContext = useContext(CartContext)
    const hasItems = cartContext.items.length > 0
    const removeItemHandler = (id) => {
        cartContext.removeItem(id)
    }

    const addItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (data) => {
        setIsSubmitting(true)
        await fetch('https://food-a890b-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: data,
                orderedItems: cartContext.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartContext.clear()
    }

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = <React.Fragment>
        <ul className={classes['cart-items']}>
            {cartContext.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addItemHandler.bind(null, item)}
                    onRemove={removeItemHandler.bind(null, item.id)}
                />)
            )}
        </ul>
        <div className={classes.total}>
            <span>Amount</span>
            <span>${cartContext.totalAmount.toFixed(2)}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart}/>}
        {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = (<React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            </div>
        </React.Fragment>)

    return <Modal onClose={props.onCloseCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart