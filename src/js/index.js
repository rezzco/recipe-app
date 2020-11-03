import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import List from "./models/List";

import {DOMElements, renderLoader, clearLoader} from './views/base';
/*
The global state of the app:
Search object
current recipe object
shopping list obj
liked recipes
*/

const state = {

};

const controlSearch = async ()=>{
    //get querry from the view
    const query = searchView.getInput(); // to do for view part;

    if (query) {
        //new search object and add it to state;
        state.search = new Search(query);


        //prepare ui for results
        searchView.clearInput();
        renderLoader(DOMElements.searchResults);

       // Search for recipes
        await state.search.getResults();
        if (state.search.result) {
            searchView.clearItems();
            //testing.


            clearLoader();
            searchView.renderResults(state.search.result);

        }else{
            clearLoader();
            alert("Error accesing the recipe for your search keywork!:(");
        }
    }
}




const controlRecipe = async ()=>{
    //get id from url
    const id = window.location.hash.replace('#','');


    if (id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(DOMElements.recipe);

        if ('search' in state) {
            searchView.highlightSelected(id);
        }

        //create new recipe obj
        state.recipe = new Recipe(id);

        try {
                //get recipe data
            await state.recipe.getRecipe();

            //calculate servings
            state.recipe.calculateServings();
            state.recipe.calculateTime();

            //rending recipe;
            state.recipe.parseIngredients();
            clearLoader();

            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
            } catch(e) {
                // statements
                alert("Error processing the recipe.");
            }
        }
}

const controlList = ()=>{
    //create a list if there is none
    if (!state.shoppingList) state.shoppingList = new List();

    //add each ingredients to list
    state.recipe.ingredients.forEach(el=>state.shoppingList.addItem(el.count, el.unit, el.material));

    listView.renderItem(state.shoppingList.items);
};




const controlLike = ()=>{
    if (!state.likes) state.likes = new Likes();
    const currentRecipe = state.recipe;

    //user has not liked the current recipe
    if (!state.likes.isLiked(currentRecipe.id)) {
        //add like to the state likes
        const newLike = state.likes.addLike(currentRecipe.id, currentRecipe.title, currentRecipe.author, currentRecipe.img);

        //toggle the like button css
        likesView.toggleLikeBtn(true);

        //add like to ui list
        likesView.renderLike(newLike);

     //user has already liked the current recipe
    }else{
        //remove like from the state likes
        state.likes.removeLike(currentRecipe.id);

        //toggle the like button css
        likesView.toggleLikeBtn(false);

        //remove like from ui list
        likesView.removeLike(currentRecipe.id);

    }
    likesView.toggleLikesMenu(state.likes.getNumLikes());
};

//restore likes from local storage on page load
window.addEventListener("load", ()=>{

    state.likes = new Likes();

    //read likes
    state.likes.readStorage();

    //toggle the like btn
    likesView.toggleLikesMenu(state.likes.getNumLikes());

    //loop through stored likes and display them
    state.likes.likes.forEach(like=>likesView.renderLike(like));

});

//loading recipe click or requested on load.
['hashchange','load'].forEach(event=> window.addEventListener(event, controlRecipe));

DOMElements.recipe.addEventListener("click", e=>{
    if (e.target.matches(".btn-increase, .btn-increase * ")) {
        // btn inc is clicked

            state.recipe.updateServings("inc");
            recipeView.updateServingsIngredients(state.recipe);

    }else if (e.target.matches(".btn-decrease, .btn-decrease * ")) {
        // btn dec is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings("dec");
            recipeView.updateServingsIngredients(state.recipe);
        }

    }else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
        // btn shop list is clicked
        controlList();

    }else if (e.target.matches(".recipe__love , .recipe__love *")) {
        controlLike();
    }

});

//event listener for update count and delete from shping list
DOMElements.shoppingList.addEventListener("click", e=>{

    const id = e.target.closest(".shopping__item").dataset.itemid;

    if (e.target.matches(".shopping__delete, .shopping__delete *")) {
        //delete from state and user interface

        listView.deleteItem(id);
        state.shoppingList.deleteItem(id);

    }
});
DOMElements.shoppingList.addEventListener("change", e=>{

    const id = e.target.closest(".shopping__item").dataset.itemid;

    if (e.target.matches(".shopping__count-value")) {
        //delete from state and user interface
        const newCountVal = parseFloat(listView.getCountValue(id));
        state.shoppingList.updateCount(id, newCountVal);
    }
});

DOMElements.searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    controlSearch();
});


DOMElements.searchPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goto = parseInt(btn.dataset.goto);
        searchView.clearItems();
        searchView.renderResults(state.search.result, goto );
    }
});
