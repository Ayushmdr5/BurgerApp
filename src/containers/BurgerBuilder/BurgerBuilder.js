import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props)
        // axios.get('https://myburgerapp-d20b7.firebaseio.com/ingredients.json')
        //     .then((response) => {
        //         this.setState({ingredient: response.data})
        //     })
        //     .catch((error) => {
        //         this.setState({error: true})
        //     })
        this.props.onInitIngredients()

    }

    updatePurchaseable(ingredient) {
        const sum = Object.keys(ingredient)
            .map((igkey) => {
                return ingredient[igkey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = this.props.error ? <p>Ingredients couldn't be fetched</p> : <Spinner />
        let orderSummary = null;

        if (this.props.ings !== null) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        purchaseable={this.updatePurchaseable(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>)

            orderSummary = <OrderSummary
                ingredient={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));