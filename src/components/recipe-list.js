import React from 'react';
import RecipeListEntry from './recipe-list-entry';


const RecipeList = (props) => {

    const recipeNames = props.recipes.map((entry) => {
        return (<RecipeListEntry name={entry.name}
                                 id={entry.name}
                                 key={entry.name}
                                 recipeClicked={(name) => props.recipeClicked(entry)}
        />);
    });

    return (
        <div className="sidebar"><h4>Recipes</h4>
            <ul>
                {recipeNames}
            </ul>
        </div>
    );
};

export default RecipeList;
