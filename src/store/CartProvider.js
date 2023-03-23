import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState  = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [ ...state.items ]
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount

        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
        const existingItem = state.items[existingItemIndex]

        if (existingItem) {
            updatedItems[existingItemIndex] = {
                ...existingItem,
                amount: existingItem.amount + action.payload.amount
            }
        } else {
            updatedItems.push(action.payload)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedItems = [ ...state.items ]
        const existingItemIndex = state.items.findIndex(item => item.id === action.payload)
        const existingItem = state.items[existingItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.payload)
        } else {
            updatedItems[existingItemIndex] = {...existingItem, amount: existingItem.amount - 1}
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "CLEAR") {
        return defaultCartState
    }

    return defaultCartState
}
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
     const addItemToCartHandler = item => {
        dispatchCartAction({type: "ADD_ITEM", payload: item})
     }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: "REMOVE_ITEM", payload: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: "CLEAR"})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clear: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider