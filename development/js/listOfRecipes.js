document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector(".mainListOfRecipesContainer");
    const recipesButton = document.querySelector("#recipesButton");
    const recipesContainer = document.querySelector(".recipesContainer");
    const dashboard = document.querySelector(".dashboard");
    const listOfRecipesContainer = document.querySelector(".listOfRecipesContainer");

    for (let i = 1; i < localStorage.length; i++) {
        let recipeNumber = JSON.parse(localStorage.getItem(`recipe_nr_${i}`));
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

    recipesButton.addEventListener("click", function () {
        recipesContainer.style.display = "none";
        dashboard.style.display = "none";
        listOfRecipesContainer.style.display = "block";
    });
});