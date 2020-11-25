import React, {Component} from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

class OrderSummary extends Component{
    //This can also be a functional component, doesn't have to be a class component
    componentWillUpdate(){
        console.log("[ordersummary] ...")
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredient)
        .map((igKey) => {
            return(
                <li key = {igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {this.props.ingredient[igKey]}
                </li>
            )
        })
        return(
            <Aux>
            <p>Your delicious burger with following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>   
            <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked = {this.props.purchaseCancel} >CANCEL</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinue} >CONTINUE</Button>
        </Aux>
        )
    }
}

export default OrderSummary