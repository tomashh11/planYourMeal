document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector(".mainListOfPlansContainer");
    const plansButton = document.querySelector("#plansButton");
    const dashboard = document.querySelector(".dashboard");
    const listOfPlansContainer = document.querySelector(".listOfPlansContainer");
    const listOfRecipesContainer = document.querySelector(".listOfRecipesContainer");
    const messageAndFormBgc = document.querySelector(".messageAndFormBgc");
    const recipesContainer = document.querySelector(".recipesContainer");
    const addPlan = document.querySelector(".addPlan");


    plansButton.addEventListener("click", function () {
        const plansFromStorage = new Map(JSON.parse(localStorage.getItem("plans")));
        const numberOfWeeks = 52;
        let counter = 0;

        for (let i = 1; i <= numberOfWeeks; i++) {
            if (plansFromStorage.has(`${i}`)) {
                let planNumber = plansFromStorage.get(`${i}`);

                counter++;

                const listOfPlansDivContainer = document.createElement("div");
                listOfPlansDivContainer.classList.add("divListOfPlansContainer");
                mainContainer.appendChild(listOfPlansDivContainer);
                const spanID = document.createElement("span");
                spanID.classList.add("spanID");
                listOfPlansDivContainer.appendChild(spanID);
                spanID.innerHTML = `${counter}`;

                const spanPlanName = document.createElement("span");
                spanPlanName.classList.add("spanPlanName");
                listOfPlansDivContainer.appendChild(spanPlanName);
                spanPlanName.innerHTML = planNumber.planName;

                const spanPlanDescription = document.createElement("span");
                spanPlanDescription.classList.add("spanPlanDescription");
                listOfPlansDivContainer.appendChild(spanPlanDescription);
                spanPlanDescription.innerHTML = planNumber.planDescription;

                const spanPlanWeekNumber = document.createElement("span");
                spanPlanWeekNumber.classList.add("spanPlanWeekNumber");
                listOfPlansDivContainer.appendChild(spanPlanWeekNumber);
                spanPlanWeekNumber.innerHTML = planNumber.weekNumber;

                const spanButtonsAction = document.createElement("span");
                spanButtonsAction.classList.add("spanButtonsAction");
                listOfPlansDivContainer.appendChild(spanButtonsAction);
                spanButtonsAction.innerHTML = `<i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>`;

                const divUnderline = document.createElement("div");
                divUnderline.classList.add("divUnderline");
                mainContainer.appendChild(divUnderline);

            }
        }

        messageAndFormBgc.style.display = "none";
        dashboard.style.display = "none";
        listOfRecipesContainer.style.display = "none";
        recipesContainer.style.display = "none";
        addPlan.style.display = "none";
        listOfPlansContainer.style.display = "block";
    });
});