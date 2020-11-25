import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return(
        <div className = {classes.CheckoutSummary}>
            <h2>Hope it is delicious!</h2>
            <div style = {{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredient = {props.ingredient}/>
            </div>
            <Button 
                btnType = "Danger"
                clicked = {props.checkoutCancel}> CANCEL 
            </Button>
            <Button 
                btnType = "Success"
                clicked = {props.checkoutContinue}> CONTINUE
            </Button>
        </div>
    )

}

export default checkoutSummary