import {useRef, useState} from "react";
import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim().length === 0
const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        city: true,
        street: true
    })
    const nameInputRef = useRef()
    const cityInputRef = useRef()
    const streetInputRef = useRef()
    const confirmHandler = (event) => {
        event.preventDefault()

        const name = nameInputRef.current.value
        const city = cityInputRef.current.value
        const street = streetInputRef.current.value

        const nameIsValid = !isEmpty(name)
        const cityIsValid = !isEmpty(city)
        const streetIsValid = !isEmpty(street)

        setFormInputsValidity({
            name: nameIsValid,
            city: cityIsValid,
            street: streetIsValid
        })

        const formIsValid = nameIsValid && cityIsValid && streetIsValid

        if (!formIsValid) {
            return
        }
        props.onConfirm({
            name,
            city,
            street
        })
    }

    const nameControlClasses =`${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`
    const cityControlClasses =`${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`
    const streetControlClasses =`${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <div>Please enter a valid name!</div>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <div>Please enter a valid city!</div>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <div>Please enter a valid street!</div>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;