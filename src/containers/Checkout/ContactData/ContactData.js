import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true

            }
        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props)
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    // checkValidity(value, rules) {
    //     let isValid = true
    //     if (!rules){
    //         return true
    //     }
    //         if (rules.required) {
    //             isValid = value.trim() !== '' && isValid
    //         }
    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }
    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }
    //     return isValid
    // }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })


        // ***WITHOUT USING UPDATEOBJECT*** //
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // }
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        // updatedFormElement.touched = true
        // updatedOrderForm[inputIdentifier] = updatedFormElement

        // let formIsValid = true
        // for (let inputIdentifier in updatedOrderForm) {
        //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        // }
        // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }
    render() {
        // console.log(this.props)
        const formElementArr = []
        for (let key in this.state.orderForm) {
            formElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArr.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />

                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))