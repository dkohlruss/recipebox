import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './components/recipe-list';
import CurrentRecipe from './components/current-recipe';
// import './index.css'; // Style import

class MyRecipeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {  recipes : this.props.recipes,
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

    changeRecipe(newRecipe) {

        this.setState({ currentrecipe: newRecipe });
        console.log(this.state.currentrecipe);
    }

    addNewRecipe(addedState) {
        let newRecipe = {name: addedState.newName,
                        ingredients: addedState.newIngredients,
                        directions: addedState.newDirections};
        let tempState = this.state.recipes;
        tempState.push(newRecipe);
        this.setState({ currentrecipe: newRecipe,
                        recipes: tempState });
    }

    onUpdate(event) {
        let currentRecipe = this.state.currentrecipe;
        switch (event.target.className) {
            case ('current-recipe-name'):
                currentRecipe.name = event.target.value;
                break;
            case ('current-recipe-ingredients'):
                currentRecipe.ingredients = event.target.value.split(',');
                break;
            case ('current-recipe-directions'):
                currentRecipe.directions = event.target.value;
                break;
        }
        this.setState({currentrecipe: currentRecipe});
        // Add in className handling/switch statement here
    }

    render() {
        return (
            <div>
                <RecipeList recipes={this.state.recipes} recipeClicked={this.changeRecipe} />
                <CurrentRecipe
                    recipe={this.state.currentrecipe}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    editing={this.state.editing}
                    updateRecipe={this.onUpdate}
                    addNewRecipe={this.addNewRecipe}
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


