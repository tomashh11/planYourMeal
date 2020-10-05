document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector(".mainListOfRecipesContainer");
    const recipesButton = document.querySelector("#recipesButton");
    const recipesContainer = document.querySelector(".recipesContainer");
    const dashboard = document.querySelector(".dashboard");
    const listOfRecipesContainer = document.querySelector(".listOfRecipesContainer");
    const listOfPlansContainer = document.querySelector(".listOfPlansContainer");
    const messageAndFormBgc = document.querySelector(".messageAndFormBgc");
    const addPlan = document.querySelector(".addPlan");


    recipesButton.addEventListener("click", function () {
        for (let i = 1; i < localStorage.length; i++) {
            let recipeNumber = JSON.parse(localStorage.getItem(`recipe_nr_${i}`));
            if (recipeNumber !== null) {
                const listOfRecipesDivContainer = document.createElement("div");
                listOfRecipesDivContainer.classList.add("divListOfRecipesContainer");
                mainContainer.appendChild(listOfRecipesDivContainer);
                const spanID = document.createElement("span");
                spanID.classList.add("spanID");
                listOfRecipesDivContainer.appendChild(spanID);
                spanID.innerHTML = `${i}`;
                const spanRecipeName = document.createElement("span");
                spanRecipeName.classList.add("spanRecipeName");
                listOfRecipesDivContainer.appendChild(spanRecipeName);
                spanRecipeName.innerHTML = recipeNumber.recipesArray[0].recipeName;
                const spanRecipeDescription = document.createElement("span");
                spanRecipeDescription.classList.add("spanRecipeDescription");
                listOfRecipesDivContainer.appendChild(spanRecipeDescription);
                spanRecipeDescription.innerHTML = recipeNumber.recipesArray[0].recipeDescription;
                const spanButtonsAction = document.createElement("span");
                spanButtonsAction.classList.add("spanButtonsAction");
                listOfRecipesDivContainer.appendChild(spanButtonsAction);
                spanButtonsAction.innerHTML = `<i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>`;
                const divUnderline = document.createElement("div");
                divUnderline.classList.add("divUnderline");
                mainContainer.appendChild(divUnderline);
            }
        }

        recipesContainer.style.display = "none";
        messageAndFormBgc.style.display = "none";
        listOfPlansContainer.style.display = "none";
        dashboard.style.display = "none";
        addPlan.style.display = "none";
        listOfRecipesContainer.style.display = "block";
    });
});