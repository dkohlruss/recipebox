import React, { Component } from 'react';
import RecipeIngredient from './recipe-ingredient';

// Probably has to become a class....

class CurrentRecipe extends Component  {
    constructor(props) {
        super(props);

        this.state = { editing: false,
                        newName: '',
                        newIngredients: [],
                        newDirections: ''};

        this.onEdit = this.onEdit.bind(this);
    }

    onEdit(toggle) {
        this.setState({ editing: toggle });
    }

    handleChange(event) {
        this.props.updateRecipe(event);
    }

    handleNew(event) {
        switch (event.target.className) {
            case ('current-recipe-name'):
                this.setState({newName : event.target.value});
                break;
            case ('current-recipe-ingredients'):
                this.setState({newIngredients : event.target.value.split(',')});
                break;
            case ('current-recipe-directions'):
                this.setState({newDirections : event.target.value});
                break;
        }
    }

    addRecipe(toggle, newRecipe) {
        this.setState({ adding: toggle });
        if (!toggle) {
            this.props.addNewRecipe(newRecipe);
        }
    }

    // CurrentRecipe is created with an initial state
    // Editing the field will change the state of CurrentRecipe, clicking add will change the state of the app
    render() {
        const ingredients = this.props.recipe.ingredients.map((ingredient) => {
            return <RecipeIngredient className="current-recipe-ingredient" ingredient={ingredient} key={ingredient} editing={this.state.editing} />;
        });

        if (this.state.editing) {
            return (
                <div>
                    <input value={this.props.recipe.name}
                            className="current-recipe-name" onChange={(event) => this.handleChange(event)} /><br />
                    <input className="current-recipe-ingredients" value={this.props.recipe.ingredients.join(',')} onChange={(event) => this.handleChange(event)} /> <br />
                    <textarea className="current-recipe-directions" value={this.props.recipe.directions} onChange={(event) => this.handleChange(event)} /> <br />
                    <button onClick={() => this.onEdit(false)}>BUTAN</button>
                </div>
            );
        } else if (this.state.adding) {
            return (
                <div>
                    <input value={this.state.newName}
                           className="current-recipe-name" onChange={(event) => this.handleNew(event)} /><br />
                    <input className="current-recipe-ingredients" value={this.state.newIngredients.join(',')} onChange={(event) => this.handleNew(event)} /> <br />
                    <textarea className="current-recipe-directions" value={this.state.newDirections} onChange={(event) => this.handleNew(event)} /> <br />
                    <button onClick={() => this.addRecipe(false, this.state)}>Save!</button>
                </div>
            );
        }


        return (
            <div>
                <h1>{this.props.recipe.name}</h1>
                <div>
                    <ul>{ingredients}</ul>
                </div>
                <div>
                    {this.props.recipe.directions}
                </div>
                <button onClick={(key) => this.onEdit(this.props)}>Edit</button>
                <button onClick={(key) => this.props.onDelete(this.props.recipe)}>Delete</button>
                <button onClick={() => this.addRecipe(true)}>Add</button>
            </div>
        );
    }
}

export default CurrentRecipe;
