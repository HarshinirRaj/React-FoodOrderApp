import classes from './Checkout.module.css'
import { useRef, useState } from 'react';

const isEmpty = (val) => val.trim() === '';

const isFiveChars = (val) => val.trim().length === 5;

const Checkout = (props) => {

    const nameInputRef = useRef()
    const postalInputRef = useRef()
    const streetInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputsValidity, setFormInputValidity] = useState({
        name : true,
        street : true,
        postalCode : true,
        city : true
    })

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostalCode)

        setFormInputValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            postalCode : enteredPostalIsValid,
            city : enteredCityIsValid
        })
        
        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid

        if(!formIsValid){
            return
        }

        // submit cart data
        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            postalCode : enteredPostalCode,
            city : enteredCity
        });

    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

    return(
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name"> Your name </label>
                <input type="text" id="name" ref={nameInputRef}></input>
                {!formInputsValidity.name && <p> Please enter a valid name </p>}
            </div>

            <div className={streetControlClasses}>
                <label htmlFor="street"> Street </label>
                <input type="text" id="street" ref={streetInputRef}></input>
                {!formInputsValidity.street && <p> Please enter a valid street </p>}
            </div>

            <div className={postalControlClasses}>
                <label htmlFor="postal"> Postal Code </label>
                <input type="text" id="postal" ref={postalInputRef}></input>
                {!formInputsValidity.postalCode && <p> Please enter a valid postal code (5 chars long) </p>}
            </div>

            <div className={cityControlClasses}>
                <label htmlFor="city"> City </label>
                <input type="text" id="city" ref={cityInputRef}></input>
                {!formInputsValidity.city && <p> Please enter a valid city </p>}
            </div>

            <div className={classes.actions}>
                <button> Confirm </button>
                <button type='button' onClick={props.onCancel}> Cancel </button>
            </div>


        </form>
    )
}

export default Checkout

