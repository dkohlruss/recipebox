import React from 'react';
import RecipeIngredient from './recipe-ingredient';

const CurrentRecipe = (props) => {
    const ingredients = props.recipe.ingredients.map((ingredient) => {
        return <RecipeIngredient ingredient={ingredient} key={ingredient} />;
    });

    return (
        <div>
            <h1>{props.recipe.name}</h1>
            <div>
                <ul>{ingredients}</ul>
            </div>
            <div>
                {props.recipe.directions}
            </div>
            <button onClick={(key) => props.onEdit(props.recipe)}>Edit</button>
            <button onClick={(key) => props.onDelete(props.recipe)}> Delete</button>
        </div>
    );
};
export default CurrentRecipe;
