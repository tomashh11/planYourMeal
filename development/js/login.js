document.addEventListener("DOMContentLoaded", function () {

    let spanUserName = document.querySelector(".planYourMealName");
    const form = document.querySelector("form");
    let userName = form.querySelector("#userName");
    const messageAndFormBgc = document.querySelector(".messageAndFormBgc");
    const dashboard = document.querySelector(".dashboard");

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
            };
        });
    }
});