let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["green", "red", "yellow", "purple"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelup(); //when game starts level up
    }
});

function levelup() {
    level++;
    h3.innerText = `Level ${level}`;

    // generate random colors
    let index = Math.floor(Math.random() * 4);
    let randomColor = btns[index];
    let rbtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    gameFlash(rbtn);  //random btn choosen
}

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkSeq() {
    let id = userSeq.length - 1;

    if (userSeq[id] === gameSeq[id]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(function () {
                userSeq = [];
                levelup();
            }, 1000);
        }
    } else {
        h3.innerHTML = `Game Over!..<br> Your score was ${level} <br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    if (!started) return;
    // console.log("btn was pressed");
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkSeq();
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}