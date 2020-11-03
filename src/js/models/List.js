import uniqid from 'uniqid';

const idToIndex = (shoppingList,id)=>{
    return shoppingList.items.findIndex(el=>el.id===id);
}

export default class ShoppingList{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const idx = idToIndex(this, id);
        const deletedItem = this.items.splice(idx,1);
        console.log(deletedItem);

    }

    updateCount(id, newCount){
        const idx = idToIndex(this, id);
        this.items[idx].count = newCount;
        //or
        //this.items.find(el=>el.id ===id).count = newCount;
    }
}
