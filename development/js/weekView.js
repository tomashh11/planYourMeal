document.addEventListener('DOMContentLoaded', function () {

    const weekDays = [
        {dayName: "Monday", dayNumber: 0},
        {dayName: "Tuesday", dayNumber: 1},
        {dayName: "Wednesday", dayNumber: 2},
        {dayName: "Thursday", dayNumber: 3},
        {dayName: "Friday", dayNumber: 4},
        {dayName: "Saturday", dayNumber: 5},
        {dayName: "Sunday", dayNumber: 6}
    ];

    const maxWeekNumber = 52;
    const minWeekNumber = 1;
    const numberOfMeals = 4;

    const weekPlanContainer = document.querySelector(".weekPlanContainer");
    const weekNumber = weekPlanContainer.querySelector(".weekNumber");

    let currentWeekNumber = getWeekNumber(new Date());

    let plansFromStorage = new Map(JSON.parse(localStorage.getItem("plans")));

    let currentPlan = resolveCurrentWeekPlan(currentWeekNumber, plansFromStorage);

    let currentPlanWeekNumber = currentPlan !== undefined
        ? Number(currentPlan.weekNumber)
        : -1;

    displayPlan(currentPlan);

    function displayPlan(plan) {

        weekNumber.innerHTML = plan !== undefined
            ? `Twój plan na ${plan.weekNumber} tydzień:`
            : "Brak planów na nadchodzące tygodnie!";

        for (let i = 0; i <= numberOfMeals; i++) {
            for (let weekDay of weekDays) {
                let dayName = weekDay.dayName;

                let firstBreakfast = plan.days[weekDay.dayNumber].firstBreakfast;
                let secondBreakfast = plan.days[weekDay.dayNumber].secondBreakfast;
                let soup = plan.days[weekDay.dayNumber].soup;
                let mainCourse = plan.days[weekDay.dayNumber].mainCourse;
                let supper = plan.days[weekDay.dayNumber].supper;

                weekPlanContainer.querySelector(`.firstBreakfast${dayName}`).innerText = firstBreakfast;
                weekPlanContainer.querySelector(`.secondBreakfast${dayName}`).innerText = secondBreakfast;
                weekPlanContainer.querySelector(`.soup${dayName}`).innerText = soup;
                weekPlanContainer.querySelector(`.mainCourse${dayName}`).innerText = mainCourse;
                weekPlanContainer.querySelector(`.supper${dayName}`).innerText = supper;
            }
        }
    };

    function resolveCurrentWeekPlan(currentWeekNumber, plansFromStorage) {
        let isCurrentWeekPlanPresent = plansFromStorage.has(currentWeekNumber);

        if (isCurrentWeekPlanPresent) {
            return plansFromStorage.get(currentWeekNumber);
        } else {
            for (let i = currentWeekNumber; i <= maxWeekNumber; i++) {
                if (plansFromStorage.has(i.toString())) {
                    return plansFromStorage.get(i.toString());
                }
            }
        }
    };

    function getWeekNumber(actualDate) {
        const todayDate = new Date(actualDate.valueOf());
        const dayNumber = (actualDate.getDay() + 6) % 7;
        todayDate.setDate(todayDate.getDate() - dayNumber + 3);
        const firstThursday = todayDate.valueOf();
        todayDate.setMonth(0, 1);
        if (todayDate.getDay() !== 4) {
            todayDate.setMonth(0, 1 + ((4 - todayDate.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - todayDate) / 604800000);
    };

    const prevNextContainer = document.querySelector(".prevNextContainer");
    const nextBtn = prevNextContainer.querySelector(".next");
    const prevBtn = prevNextContainer.querySelector(".prev");

    function findNextWeekNumber() {
        for (let i = currentPlanWeekNumber + 1; i <= maxWeekNumber; i++) {
            if (plansFromStorage.has(i.toString())) {
                return i;
            }
        }
    };

    nextBtn.addEventListener('click', function () {

        let nextWeekNumber = findNextWeekNumber();

        if (nextWeekNumber !== undefined) {
            currentPlanWeekNumber = nextWeekNumber;
            weekNumber.innerHTML = `Twój plan na ${nextWeekNumber} tydzień:`;
            let planAfterCurrent = plansFromStorage.get(nextWeekNumber.toString());
            displayPlan(planAfterCurrent);
        } else {
            alert("Nie ma więcej planów");
        }
    });

    function findPreviousWeekNumber() {
        for (let i = currentPlanWeekNumber - 1; i >= minWeekNumber; i--) {
            if (plansFromStorage.has(i.toString())) {
                return i;
            }
        }
    };

    prevBtn.addEventListener('click', function () {

        let prevWeekNumber = findPreviousWeekNumber();

        if (prevWeekNumber !== undefined) {
            currentPlanWeekNumber = prevWeekNumber;
            weekNumber.innerHTML = `Twój plan na ${prevWeekNumber} tydzień:`;
            let planBeforeCurrent = plansFromStorage.get(prevWeekNumber.toString());
            displayPlan(planBeforeCurrent);
        } else {
            alert("Nie ma więcej planów");
        }
    });
});