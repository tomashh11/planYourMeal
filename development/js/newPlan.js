document.addEventListener('DOMContentLoaded', function () {

    const weekDays = [
        {dayName: "monday"},
        {dayName: "tuesday"},
        {dayName: "wednesday"},
        {dayName: "thursday"},
        {dayName: "friday"},
        {dayName: "saturday"},
        {dayName: "sunday"}
    ];

    const addPlan = document.querySelector(".addPLan");
    const form = addPlan.querySelector("form");
    const planName = document.querySelector("#planName");
    const planDescription = document.querySelector("#planDescription");
    const weekNumber = document.querySelector("#newWeekNumber");


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let days = [];

        for (let weekDay of weekDays) {
            const firstBreakfast = form.querySelector(`.${weekDay.dayName}FirstBreakfast`);
            const secondBreakfast = form.querySelector(`.${weekDay.dayName}SecondBreakfast`);
            const soup = form.querySelector(`.${weekDay.dayName}Soup`);
            const mainCourse = form.querySelector(`.${weekDay.dayName}MainCourse`);
            const supper = form.querySelector(`.${weekDay.dayName}Supper`);

            days.push({
                firstBreakfast: firstBreakfast.value,
                secondBreakfast: secondBreakfast.value,
                soup: soup.value,
                mainCourse: mainCourse.value,
                supper: supper.value
            });
        }

        let plan = {
            weekNumber: weekNumber.value,
            planName: planName.value,
            planDescription: planDescription.value,
            days: days
        };

        // localStorage.clear();

        if (localStorage.getItem("plans") !== null) {
            let planFromStorage = new Map(JSON.parse(localStorage.getItem("plans")));
            if (planFromStorage.has(weekNumber.value)) {
                alert("Plan dla tego tygodnia już istnieje")
            } else {
                planFromStorage.set(weekNumber.value, plan);
                localStorage.setItem("plans", JSON.stringify(Array.from(planFromStorage.entries())));
                console.log(planFromStorage);
                alert("Dodano plan dla kolejnego tygodnia !!");
            }
        } else {
            let plans = new Map();
            plans.set(weekNumber.value, plan);
            localStorage.setItem("plans", JSON.stringify(Array.from(plans.entries())));
            console.log(plans);
            alert("Dodano pierwszy plan !!");
        }
        planName.value = "";
        planDescription.value = "";
        weekNumber.value = "";
    });
});