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

    const weekPlanContainer = document.querySelector(".weekPlanContainer");
    const weekNumber = weekPlanContainer.querySelector(".weekNumber");

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

    const currentWeekNumber = getWeekNumber(new Date());

    let plansFromStorage = new Map(JSON.parse(localStorage.getItem("plans")));

    let currentPlan = resolveCurrentWeekPlan(currentWeekNumber, plansFromStorage);

    weekNumber.innerHTML = `Twój plan na ${currentPlan.weekNumber} tydzień:`;

    const numberOfMeals = 4;

    for (let i = 0; i <= numberOfMeals; i++) {
        for (let weekDay of weekDays) {
            let dayName = weekDay.dayName;

            let firstBreakfast = currentPlan.days[weekDay.dayNumber].firstBreakfast;
            let secondBreakfast = currentPlan.days[weekDay.dayNumber].secondBreakfast;
            let soup = currentPlan.days[weekDay.dayNumber].soup;
            let mainCourse = currentPlan.days[weekDay.dayNumber].mainCourse;
            let supper = currentPlan.days[weekDay.dayNumber].supper;

            weekPlanContainer.querySelector(`.firstBreakfast${dayName}`).innerText = firstBreakfast;
            weekPlanContainer.querySelector(`.secondBreakfast${dayName}`).innerText = secondBreakfast;
            weekPlanContainer.querySelector(`.soup${dayName}`).innerText = soup;
            weekPlanContainer.querySelector(`.mainCourse${dayName}`).innerText = mainCourse;
            weekPlanContainer.querySelector(`.supper${dayName}`).innerText = supper;
        }
    }

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
    }

    const prevNextContainer = document.querySelector(".prevNextContainer");
    const nextBtn = prevNextContainer.querySelector(".next");
    const prevBtn = prevNextContainer.querySelector(".prev");

    nextBtn.addEventListener('click', function () {
    console.log("next klikniety")
    });

    prevBtn.addEventListener('click', function () {
        console.log('prev klikniety')
    });
});