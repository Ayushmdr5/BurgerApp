import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredient: null,
    error: false,
    totalPrice: 4,
    building: false
}

const INGREDIETN_PRICES = {
    salad: 0.2,
    meat: 1.0,
    bacon: 0.5,
    cheese: 0.3
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredient[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredient, updatedIngredient)
    const updatedState = {
        ingredient: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIETN_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)

    // Can be done by this method also //
    // return {
    //     ...state,
    //     ingredient: {
    //         ...state.ingredient,
    //         [action.ingredientName]: state.ingredient[action.ingredientName] + 1
    //     },
    //     totalPrice: state.totalPrice + INGREDIETN_PRICES[action.ingredientName]
    // }
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredient[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredient, updatedIng)
    const updatedSt = {
        ingredient: updatedIngs,
        totalPrice: state.totalPrice - INGREDIETN_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt)
    // return {
    //     ...state,
    //     ingredient: {
    //         ...state.ingredient,
    //         [action.ingredientName]: state.ingredient[action.ingredientName] - 1
    //     },
    //     totalPrice: state.totalPrice - INGREDIETN_PRICES[action.ingredientName]
    // }
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredient: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
    // return {
    //     ...state,
    //     ingredient: {
    //         salad: action.ingredients.salad,
    //         bacon: action.ingredients.bacon,
    //         cheese: action.ingredients.cheese,
    //         meat: action.ingredients.meat
    //     },
    //     totalPrice: 4,
    //     error: false
    // }
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
    // return {
    //     ...state,
    //     error: true
    // }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)

        default: return state
    }
}

export default reducer


