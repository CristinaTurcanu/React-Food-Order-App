import classes from "./FoodItemForm.module.css"
import Input from "../UI/Input";
import {useRef, useState} from "react";


const FoodItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()
    const handleSubmit = (event) => {
        event.preventDefault()

        const enteredAmount = Number(amountInputRef.current.value)

        if (enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmount)
    }
    return <form className={classes.form} onSubmit={handleSubmit}>
        <Input
            label="Amount"
            ref={amountInputRef}
            input={{
                type: 'number',
                id: `amount-${props.id}`,
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
        }}/>
        <button type="submit">Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
}

export default FoodItemForm