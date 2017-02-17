import React from 'react';

const RecipeIngredient = (props) => {
    if (props.editing) {
        return (
            <input value={props.ingredient}></input>
        );
    } else {
        return (
          <li>{props.ingredient}</li>
        );
    }
};

export default RecipeIngredient