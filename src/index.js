import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './components/recipe-list';
import CurrentRecipe from './components/current-recipe';
// import './index.css'; // Style import

class MyRecipeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {  recipes : this.props.recipes.sort(),
                        currentrecipe : this.props.recipes[0],
        };  //Initial state is set to the 'recipes' var at bottom

        this.changeRecipe = this.changeRecipe.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.addNewRecipe = this.addNewRecipe.bind(this);
    }

    onDelete(key) {
        let tempState = this.state.recipes;
        tempState = tempState.filter((entry) => {
            return entry !== key;
        });

        if (this.state.recipes.length > 0) {
            this.setState({ recipes : tempState });
        }

        if (this.state.currentrecipe === this.state.recipes[0]) {
            this.setState({ currentrecipe: this.state.recipes[1]});
        } else {
            this.setState({ currentrecipe: this.state.recipes[0]});
        }
    }

    onUpdate(event) {
        let allRecipes = this.state.recipes;
        let currentRecipe = this.state.currentrecipe;
        let placement = allRecipes.indexOf(currentRecipe);
        let insertRecipe = {name: event.name,
                            ingredients: event.ingredients,
                            directions: event.directions
                            };

        if (!event.adding) {
            allRecipes.splice(placement,1,insertRecipe);
        } else {
            allRecipes.push(insertRecipe);
        }

        this.setState({recipes: allRecipes,
                        currentrecipe: insertRecipe});
    }

    render() {
        return (
            <div>
                <RecipeList recipes={this.state.recipes} recipeClicked={this.changeRecipe} />
                <CurrentRecipe
                    recipe={this.state.currentrecipe}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    updateRecipe={this.onUpdate}
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


