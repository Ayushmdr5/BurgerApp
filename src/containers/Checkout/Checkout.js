import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data")
        // this.props.history.push("/checkout/contact-data")
        console.log(this.props)
    }
    render() {
        let summary = <Redirect to='/' />
        console.log(this.props)
        if (this.props.ings) {
            const purchased = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary
                        ingredient={this.props.ings}
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)