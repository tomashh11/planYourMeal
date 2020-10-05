document.addEventListener('DOMContentLoaded', function () {

    const recipesContainer = document.querySelector(".recipesContainer");
    const form = recipesContainer.querySelector("form");
    const btnInstruction = document.querySelector(".recipesAddInstruction");
    const btnProduct = document.querySelector(".recipesAddProduct");
    const olInstruction = document.querySelector(".olInstruction");
    const textareaInstruction = document.querySelector("#instruction");
    const ulProduct = document.querySelector(".ulProduct");
    const textareaProduct = document.querySelector("#product");
    const recipeName = document.querySelector("#recipeName");
    const recipeDescription = document.querySelector("#recipesDescription");
    const newRecipe = document.querySelector(".newRecipe");
    const dashboard = document.querySelector(".dashboard");

    newRecipe.addEventListener('click', function(){
        dashboard.style.display = "none";
        recipesContainer.style.display = "block";
    });

    function checkCorrectness() {
        if (recipeName.value.length <= 0 || recipeDescription.value.length <= 0 || olInstruction.hasChildNodes() === false) {
            return false;
        }
        return true
    }

    btnInstruction.addEventListener('click', function () {
        const li = document.createElement('li');
        li.innerHTML = `${textareaInstruction.value}<i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>`;
        li.classList.add("first");
        olInstruction.appendChild(li);
        textareaInstruction.value = "";
    });

    btnProduct.addEventListener('click', function () {
        const li = document.createElement('li');
        li.innerHTML = `${textareaProduct.value} <i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>`;
        li.classList.add("second");
        ulProduct.appendChild(li);
        textareaProduct.value = "";
    });

    function checkRecipesCountInStorage() {
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0, 6) == 'recipe') {
                count++
            }
        }
        return count;
    };


    form.addEventListener('submit', function (e) {
            let counter = checkRecipesCountInStorage() + 1;
            e.preventDefault();
            if (!checkCorrectness()) {
                alert("Wypełnij brakujące pola");
            } else {
                const liFirstArray = [];
                const liSecondArray = [];
                const liFirst = document.querySelectorAll(".first");
                for (const el of liFirst) {
                    liFirstArray.push(el.innerText);
                }
                const liSecond = document.querySelectorAll(".second");
                for (const el of liSecond) {
                    liSecondArray.push(el.innerText);
                }

                let recipe = {
                    recipeName: recipeName.value,
                    recipeDescription: recipeDescription.value,
                    firstArray: liFirstArray,
                    secondArray: liSecondArray
                };
                let recipes = {
                    recipesArray: []
                };

                if (localStorage.getItem("recipe_nr_1") != null) {
                    console.log('test');
                    recipes.recipesArray.push(recipe);
                    localStorage.setItem(`recipe_nr_${counter}`, JSON.stringify(recipes));
                } else {
                    recipes.recipesArray.push(recipe);
                    localStorage.setItem("recipe_nr_1", JSON.stringify(recipes));
                }
                alert(`Twój przepis został dodany do Local Storage`);

                recipeName.value = "";
                recipeDescription.value = "";
                const li = document.querySelectorAll("li");
                for (const el of li) {
                    el.remove();
                }
            }
        }
    )
})
;