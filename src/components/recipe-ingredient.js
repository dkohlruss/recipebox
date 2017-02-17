import React from 'react';

const RecipeIngredient = (props) => {
    if (props.editing) {
        return (
            <input className="ingredient-entry" value={props.ingredient}></input>
        );
    } else {
        return (
            <li>{props.ingredient}</li>
        );
    }
};

export default RecipeIngredient