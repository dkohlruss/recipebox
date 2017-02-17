import React from 'react';

const RecipeListEntry = (props) => {
  return (
      <li className="recipe-entry" onClick={(name) => props.recipeClicked(name)}>{props.name}</li>
  );
};

export default RecipeListEntry;
