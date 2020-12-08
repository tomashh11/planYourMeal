document.addEventListener("DOMContentLoaded", function () {

    let spanUserName = document.querySelector(".planYourMealName");
    const form = document.querySelector("form");
    let userName = form.querySelector("#userName");
    const messageAndFormBgc = document.querySelector(".messageAndFormBgc");
    const dashboard = document.querySelector(".dashboard");
    const recipesTxt = dashboard.querySelector(".recipesTxt");

    function numberOfRecipes() {
        for (let i = 100; i >= 0; i--) {
            if (localStorage.getItem(`recipe_nr_${i}`)) {
                return i;
            }
        }
    }

    const currentNumberOfRecipes = numberOfRecipes();

    if (currentNumberOfRecipes !== undefined) {
        recipesTxt.innerHTML = `Masz już ${currentNumberOfRecipes} przepisów, nieźle!`;
    } else {
        recipesTxt.innerHTML = "Nie masz narazie żadnego dodanego przepisu!"
    }

    if (localStorage.getItem("savedName") != null) {
        spanUserName.innerHTML = localStorage.savedName;
        messageAndFormBgc.style.display = "none";
        dashboard.style.display = "block";
    } else {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            messageAndFormBgc.style.display = "none";
            dashboard.style.display = "block";
            if (userName.value.length < 1) {
                alert("Wpisz swoje imię")
            } else {
                localStorage.setItem("savedName", userName.value);
                spanUserName.innerHTML = userName.value;
            }
            ;
        });
    }
});