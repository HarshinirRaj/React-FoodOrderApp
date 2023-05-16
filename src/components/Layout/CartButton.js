import {React, useContext, useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon'
import classes from './CartButton.module.css'
import CartContext from '../../store/cart-context';

const CartButton = (props) => {

    const [btnIsHighted,setBtnIsHighlighted] =  useState(false)

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx

    const numberOfCartItems =items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    },0 )

    const btnClasses = `${classes.button} ${btnIsHighted ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0){
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        },300);
        //clean up 
        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span> Your Cart </span>
            <span className={classes.badge}> {numberOfCartItems} </span>
        </button>
    )
}

export default CartButton