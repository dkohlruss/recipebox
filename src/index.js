import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './components/recipe-list';
import CurrentRecipe from './components/current-recipe';
import './css/index.css';


class MyRecipeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {  recipes : this.props.recipes,
                        currentrecipe : this.props.recipes[0],
        };  //Initial state is set to the 'recipes' var at bottom

        this.changeRecipe = this.changeRecipe.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

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

        localStorage.setItem('myUniqueRecipeVar', JSON.stringify(this.state.recipes));
    }

    changeRecipe(newRecipe) {
        this.setState({ currentrecipe: newRecipe });
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

        localStorage.setItem('myUniqueRecipeVar', JSON.stringify(this.state.recipes));

    }

    render() {
        return (
            <div className="holder">
                <header>My Recipe Box</header>
                <div className="horiz-holder">
                    <RecipeList recipes={this.state.recipes} recipeClicked={this.changeRecipe} />
                    <CurrentRecipe
                        recipe={this.state.currentrecipe}
                        onDelete={this.onDelete}
                        onEdit={this.onEdit}
                        updateRecipe={this.onUpdate}
                    />
                </div>
            </div>
        );
    }
}

let recipes = [
    {
        name: 'Winter Vegetable Stew',
        ingredients: ['1-2 tablespoons extra virgin olive oil','1 medium yellow onion, diced',
        '1 large leek, dark green part removed and white part halved and thinly sliced',
        '2 cloves garlic, finely grated',
        '3-4 cups white or gold potatoes, peeled and diced',
        '1 + 1/2 cups cooked white beans',
        '1/2 cup green French lentils, rinsed and drained',
        '1/2 teaspoon each dried oregano, rosemary and thyme',
        '1 796ml can of whole, peeled tomatoes',
        '3 + 1/2 cups vegetable stock',
        'Salt and pepper to taste',
        '4 stalks of kale, I used dino kale but curly will work just fine too, finely chopped'],
        directions: 'Warm oil in a heavy bottomed pot over medium heat. Add onions and leeks and sauté until soft. Season with a dash of salt and pepper. Add garlic and stir to coat in oil, cooking for a minute or two. Add potatoes, beans, lentils and herbs. Stir to combine. Add tomatoes and vegetable stock. Stir together and bring to a boil. Reduce to a simmer and cover. Cook until potatoes are soft, about 30 minutes then add in finely sliced kale about continue cooking for 10 minutes. Simmer uncovered towards the end to reduce liquid if there is too much. You can simmer it for longer for more of a stew-y consistency. Taste and adjust salt and pepper as needed..',
    },
    {
        name: 'Hot Chocolate',
        ingredients: ['2 tbsp instant skim milk powder','1 ½ tbsp good quality cocoa powder (regular or Dutch Process)','1 ½ tbsp sugar', '1 ½ cups 2% milk'],
        directions: 'Stir the skim milk powder, cocoa powder and sugar in a small dish. Whisk in ¼ cup of the cold milk to blend. \n \n Pour the remaining milk plus the cocoa mixture to a small pot and slowly bring up to just below a simmer, stirring often. Ladle into a mug and serve.'
    },
    {
        name: 'Winter Root Vegetables',
        ingredients: ['2 1/2 pounds root vegetables', '1 head garlic', 'Rosemary sprigs', '3 bay leaves'],
        directions: 'Preheat the oven to 450F. Peel the vegetables, onions, and shallots. Cut everything into pieces roughly the same size except for the parsnips, sweet potatoes, and turnips, which cook faster and can be slightly larger than the rest. Toss the vegetables, garlic, and herbs with oil to coat lightly, then season with salt and pepper. Put everything in a roomy pan. Bake, uncovered, in the top 1/3 of the oven for 20 minutes, shaking the pan once or twice. Reduce the heat to 375F and continue baking until the vegetables are tender when pierced with a knife, twenty to thirty minutes, depending on how large they are. Remove the bay leaves.'
    }];

// Grabs the recipes if they're already in localStorage
if (localStorage.getItem('myUniqueRecipeVar')) {
    recipes = JSON.parse(localStorage.getItem('myUniqueRecipeVar'));
}


ReactDOM.render(
  <MyRecipeBox recipes={recipes} />,
  document.getElementById('container')
);


