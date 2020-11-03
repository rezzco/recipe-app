import {DOMElements} from './base';
export const getInput = ()=> DOMElements.searchInput.value;

export const clearItems = ()=>{

    DOMElements.recipeList.innerHTML = "";
    DOMElements.searchPages.innerHTML="";
}

export const clearInput = ()=>{
    DOMElements.searchInput.value = "";
};


export const highlightSelected = id=>{
    document.querySelectorAll(".results__link").forEach(el=>el.classList.remove("results__link--active"));
    document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active");
}
export const limitRecipeTitle = (title, limit = 17) =>{
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce(( acc, cur)=>{
            if (acc + cur.length < limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }
            , 0);
        return `${newTitle.join(" ")}...`;
    }
    return title;
};

const renderRecipe = (recipe) =>{
    let title = limitRecipeTitle(recipe.title, 17);

    const markup =
    `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src=${recipe.image_url} alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    DOMElements.recipeList.insertAdjacentHTML('beforeend', markup);

};

const createBtn = (page,type)=>
`
    <button class="btn-inline results__btn--${type}" data-goto = ${type==="prev" ? page-1:page+1}>
        <span>Page ${type==="prev" ? page-1:page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==="prev" ? 'left':'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, resPerPage, numResults)=>{
    const pages = Math.ceil(numResults/resPerPage);
    if (pages>1) {
        let btn;
        if ( page ===1 ) {
             btn=createBtn(page, 'next');
        }else if (page===pages) {
             btn =createBtn(page, 'prev');
        }else {
            btn =
             `${createBtn(page, 'prev')}
              ${createBtn(page, 'next')}`;

        }
        DOMElements.searchPages.innerHTML = btn;

    }
}

export const renderResults = (recipes, page=1, resPerPage = 5)=>{
    const start =resPerPage * (page - 1);
    const end =resPerPage * page; //slice does not include the end index;
    if (recipes) {
        recipes.slice(start, end).forEach(renderRecipe);
        renderButtons(page, resPerPage,recipes.length)

    };

}
