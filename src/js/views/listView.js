import {DOMElements} from './base';

const createItem = item =>{
    const markup =
    `
    <li class="shopping__item" data-itemid =${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    DOMElements.shoppingList.insertAdjacentHTML("beforeend", markup);
}
export const renderItem = shoppingList=>{
    shoppingList.forEach(item=>{
        createItem(item);
    });
};


export const deleteItem = id=>{
    const item = document.querySelector(`[data-itemId='${id}']`);
    if (item) {}item.parentElement.removeChild(item);
};

export const getCountValue = (id)=>{
    const newCount = document.querySelector(`[data-itemId='${id}'] .shopping__count-value`).value;
    if (newCount>0) {
        return newCount;
    }else {
        document.querySelector(`[data-itemId='${id}'] .shopping__count-value`).value = 0;
        return 0;
    }

}
