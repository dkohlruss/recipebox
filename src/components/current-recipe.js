import React, { Component } from 'react';
import RecipeIngredient from './recipe-ingredient';


class CurrentRecipe extends Component  {
    constructor(props) {
        super(props);

        this.state = { editing: false,
                        adding: false,
                        name: '',
                        ingredients: [],
                        directions: ''};

        this.onEdit = this.onEdit.bind(this);
    }

    handleNew(event) {
        switch (event.target.className) {
            case ('current-recipe-name'):
                this.setState({name : event.target.value});
                break;
            case ('current-recipe-ingredients'):
                this.setState({ingredients : event.target.value.split(',')});
                break;
            case ('current-recipe-directions'):
                this.setState({directions : event.target.value});
                break;
            default:
                break;
        }
    }

    saveRecipe(event) {
        this.props.updateRecipe(event);
        this.setState({editing: false,
                        adding: false});
    }

    onEdit(props) {
        if (!props) {
            this.setState({editing: true,
                            adding: true,
                            name: '',
                            ingredients: [],
                            directions: ''}); // If adding new recipe, just make the form editable and blank
        } else {
            this.setState({editing: true,
                            name: props.recipe.name,
                            ingredients: props.recipe.ingredients,
                            directions: props.recipe.directions}) // If editing, populate with current recipe values
        }
    }

    render() {
        const ingredients = this.props.recipe.ingredients.map((ingredient) => {
            return <RecipeIngredient className="current-recipe-ingredient" ingredient={ingredient} key={ingredient} editing={this.state.editing} />;
        });

        if (this.state.editing) {
            return (
                <div className="current-recipe">
                    <input value={this.state.name}
                           className="current-recipe-name"
                           onChange={(event) => this.handleNew(event)} /><br />
                    <textarea className="current-recipe-ingredients"
                           value={this.state.ingredients.join(',')}
                           onChange={(event) => this.handleNew(event)} /> <br />
                    <textarea className="current-recipe-directions"
                              value={this.state.directions}
                              onChange={(event) => this.handleNew(event)} /> <br />
                    <button onClick={() => this.saveRecipe(this.state)}>Save!</button>
                </div>
            );
        }

        return (
            <div className="current-recipe">
                <h1 className="current-recipe-name">{this.props.recipe.name}</h1>
                <div>
                    <ul className="current-recipe-ingredients">{ingredients}</ul>
                </div>
                <div className="current-recipe-directions">
                    {this.props.recipe.directions}
                </div>
                <button onClick={() => this.onEdit(this.props)}>Edit</button>
                <button onClick={() => this.props.onDelete(this.props.recipe)}>Delete</button>
                <button onClick={() => this.onEdit()}>Add</button>
            </div>
        );
    }
}

export default CurrentRecipe;
