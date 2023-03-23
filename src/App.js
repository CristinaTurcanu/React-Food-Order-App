import React, { useState} from "react";
import Header from "./components/Layout/Header";
import Food from "./components/Food/Food";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false)
    const showCart = () => {
        setCartIsShown(true)
    }
    const hideCart = () => {
        setCartIsShown(false)
    }
    return (
        <CartProvider>
            {cartIsShown && <Cart onCloseCart={hideCart}/>}
            <Header onShowCart={showCart} />
            <main>
               <Food />
            </main>
        </CartProvider>
    );
}

export default App;
