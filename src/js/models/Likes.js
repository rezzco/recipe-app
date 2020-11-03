export default class Likes{
    constructor(){
        this.likes = [];
    }
    addLike(id, title, author, img){
        const like = {
            id, title, author, img
        };
        this.likes.push(like);

        //Persist the like in the local storage
        this.persistData();

        return like;
    }
    removeLike(id){
        const unliked =  this.likes.splice(this.likes.findIndex(el=>el.id === id),1);

        //Persist the like in the local storage
        this.persistData();

        return unliked;
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id === id) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }
    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        //Restore like data from local storage

        if (storage) this.likes = storage;
    }
}




