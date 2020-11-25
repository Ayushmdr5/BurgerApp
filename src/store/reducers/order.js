import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
    // return {
    //     ...state,
    //     purchased: false
    // } 
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true })
    // return {
    //     ...state,
    //     loading: true
    // }
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(...action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
    // return {
    //     ...state,
    //     loading: false,
    //     orders: state.orders.concat(newOrder),
    //     purchased: true
    // }
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
    // return {
    //     ...state,
    //     loading: false
    // }
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
    // return {
    //     ...state,
    //     loading: true
    // }
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    })
// return {
//     ...state,
//     loading: false,
//     orders: action.orders
// }
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false })
    // return{
    //     ...state,
    //     loading: false
    // }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state, action)
        
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
        
        case actionType.FETCH_ORDER_START: return fetchOrderStart(state, action)
        
        case actionType.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
                    
        case actionType.FETCH_ORDER_FAIL: return fetchOrderFail(state, action)
                  
        default: return state
    }
}

export default reducer