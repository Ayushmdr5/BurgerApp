import React from 'react'
import classes from './Order.css'

const order = (props) => {
    const ingredients = []
    for (let ingredientName in props.ingredient) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredient[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map((ig) => {
        return <span style={{
            textTransform: 'capitalize',
            border: '1px solid #ccc',
            margin: '0px 5px',
            padding: '5px'
        }}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p> ingredients: {ingredientOutput}</p>
            <p> Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order