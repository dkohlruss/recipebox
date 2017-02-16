import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './components/recipe-list';
import CurrentRecipe from './components/current-recipe';

// import './index.css'; // Style import

class MyRecipeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {  recipes: this.props.recipes,
                        currentrecipe : this.props.recipes[0]
        };  //Initial state is set to the 'recipes' var at bottom

        this.changeRecipe = this.changeRecipe.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(key) {
        let tempState = this.state.recipes;
        tempState = tempState.filter((entry) => {
            console.log(entry !== key);
            return entry !== key;
        });

        this.setState({ recipes: tempState });
    }

    onEdit(key) {
        console.log(key);
    }

    changeRecipe(newRecipe) {
        this.setState({ currentrecipe: newRecipe });
    }

    render() {
        return (
            <div>
                <RecipeList recipes={this.state.recipes} recipeClicked={this.changeRecipe} />
                <CurrentRecipe
                    recipe={this.state.currentrecipe}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                />
            </div>
        );
    }
}

let recipes = [
    {
        name: 'Gluten Free Anime',
        ingredients: ['Dogs','Cats','Chickens'],
        directions: 'Put everything in a bowl.',
    },
    {
        name: 'Cheesy Things',
        ingredients: ['Taco Meat','Feet','Tongue'],
        directions: 'Put everything in a glass.',
    },
    {
        name: 'Kisses and wishes',
        ingredients: ['Hugs', 'Love', 'Kittens'],
        directions: 'Buy some bacon',
    }];

ReactDOM.render(
  <MyRecipeBox recipes={recipes} />,
  document.getElementById('container')
);


