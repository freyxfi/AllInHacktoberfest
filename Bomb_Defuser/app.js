let defuserElementInput = document.getElementById("defuser");
let timerElement = document.getElementById("timer");
let containerElement = document.getElementById("divContainer");
let warningParaEl = document.getElementById("waringpara");
let imageEl = document.getElementById("imageE");


let uniqueId = null;
let counter = 15
uniqueId = setInterval(function() {
    counter = counter - 1;
    timerElement.textContent = counter;
    if (counter <= 5) {

        warningParaEl.textContent = "Common Try Hard";
    }
    if (counter === 0) {
        timerElement.textContent = "BooM!!!";
        imageEl.src = "https://img.freepik.com/free-vector/comic-book-explosion_1284-45732.jpg?w=740&t=st=1680669836~exp=1680670436~hmac=ce2cecba18bdc30b26bfd5660995249a97cd1db53a8d26b4c21c092ea7e3ddb9";
        warningParaEl.textContent = "";

        clearInterval(uniqueId);

    }


}, 1000);



defuserElementInput.addEventListener("keydown", function(event) {

    let defuseText = defuserElementInput.value;
    if (defuseText === "defuse" && event.key === "Enter" && counter !== 0) {
        timerElement.textContent = "You did it";
        warningParaEl.textContent = "";
        defuserElementInput.value = "";
        clearInterval(uniqueId);

    }
})