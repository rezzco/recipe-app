import {DOMElements} from './base';
import { limitRecipeTitle } from './searchView';

export const renderLike = (like)=>{
    const markup = `
        <li data-id=${like.id}>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
DOMElements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const toggleLikeBtn = (isLiked)=>{
    const iconString = isLiked ? `icon-heart`:`icon-heart-outlined`;

    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
}

export const toggleLikesMenu = numLikes=>{
    DOMElements.likesMenu.style.visibility = numLikes>0 ? "visible":'hidden';
}
export const removeLike = (id)=>{
    const targetLike = DOMElements.likesList.querySelector(`a[href*='${id}']`).parentElement;
    if (targetLike) targetLike.parentElement.removeChild(targetLike);
    console.log(targetLike);
}
