export const DOMElements={
    searchInput : document.querySelector(".search__field"),
    searchForm : document.querySelector('.search'),
    recipeList : document.querySelector(".results__list"),
    searchResults:document.querySelector(".results"),
    searchPages:document.querySelector(".results__pages"),
    recipe: document.querySelector(".recipe"),
    shoppingList: document.querySelector(".shopping__list"),
    likesMenu :document.querySelector(".likes__field"),
    likesList :document.querySelector(".likes__list")
}

export const elementStrings ={
    loader:"loader"
}

export const renderLoader = parent=>{
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML("afterbegin", loader);
}

export const clearLoader = ()=>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        const parent = loader.parentElement.removeChild(loader);
    }
}
