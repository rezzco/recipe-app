import axios from 'axios';

const removeParantesisandText = (str)=>{
    while(str.indexOf("(")!==-1){
        const start = str.indexOf("(");
        const end = str.indexOf(")");
        const prn = str.slice(start, end+1);
        str = str.replace(prn, "");
        //in this case remove double space as well
        str =  str.replace("  ", " ");
    }
    return str;
};


const splitRecipe = (ing, units)=>{
    let ingredientObj ={} ;
    for(let unit of units){
        if (ing.includes(` ${unit} `)) {

            let cnt = ing.split(unit)[0].split(" ");
            cnt = cnt.map( e=> {
                if (e==="" || e===" ") {
                    e='0';
                }
                return e;
            });
             if (cnt.length>=2) {
                cnt = eval(cnt.join("+"));
            }else if (cnt.length===1) {
                cnt = eval(cnt.replace('-','+'));
            }
            ingredientObj =
            {
                count:cnt,
                material:ing.split(unit)[1],
                unit:unit
            };
            return ingredientObj;
        }
    }

    const ingArr = ing.split(" ");
    //console.log(ingArr);
    if (parseInt(ingArr[0])) {
        ingredientObj={

            count:eval(ingArr[0]),
            material:ingArr.slice(1).join(" "),
            unit:""

        };
    }else{
        ingredientObj={

            count:1,
            material:ing,
            unit:""

        };
    }
    return ingredientObj;
}


export default class Recipe{
    constructor(id){
        this.id  = id;
    }

    async getRecipe(){
        try {
            const link = `https://forkify-api.herokuapp.com/api/get?rId=`;
            const url = `${link}${this.id}`;
            const recipe = await axios(url);
            //console.log(recipe);
            this.title = recipe.data.recipe.title;
            this.author = recipe.data.recipe.publisher;
            this.img = recipe.data.recipe.image_url;
            this.url = recipe.data.recipe.source_url;
            this.ingredients = recipe.data.recipe.ingredients;
            this.title = recipe.data.recipe.title;


        } catch(e) {
            // statements
            alert(e);
        }
    }

    calculateTime(){
        this.time = this.ingredients.length*5;
    }

    calculateServings(){
        this.servings = 4;
    }

    parseIngredients(){

        const unitsOld = ['tablespoons','tablespoon','teaspoons','teaspoon','cups', 'pounds','ounces','ounce'];
        const unitsNew = ['tbsp', 'tbsp','tsp','tsp', 'cup', 'pound','oz', 'oz', 'kg', 'g'];
        const uniqueUnits = [...new Set(unitsNew)];
        const newIngredients = this.ingredients.map(ing=>{
            //"4 1/2 cups unbleached high-gluten, bread, or all-purpose flour, chilled"

            //uniform units
            let ingredient = ing.toLowerCase();
            unitsOld.forEach( (unit,index)=> {
                ingredient = ingredient.replace(unit, unitsNew[index]);
            });

            // remove parantesis
            //using an reqex;
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // or my function
            //ingredient = removeParantesisandText(ingredient);


            //pars ingredients inot count unit and ing;
            ingredient = splitRecipe(ingredient, uniqueUnits);
            return ingredient;
        });
        this.ingredients = newIngredients;
    }
    updateServings (type){
        //update servings
        const newServings = type ==='dec' ? this.servings - 1 : this.servings + 1;
        console.log(this.servings);

        // update ingredient's count
        this.ingredients.forEach(ing=>{
            ing.count *=  (newServings / this.servings);

        });

        this.servings = newServings;
    }
}









