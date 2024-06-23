let gameseq = [];
let userseq = [];
const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highscore = 0;
let h2 = document.querySelector("h2");
let highscoreDisplay = document.getElementById("highscore");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game Started");
        started = true;
        level = 0; // Reset the level to 0 on game start
        gameseq = []; // Clear the game sequence
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 100);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 100);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    const randidx = Math.floor(Math.random() * btns.length);
    const randcolor = btns[randidx];
    const randbtn = document.querySelector(`.${randcolor}`);
    btnflash(randbtn);

    // Add the random color to the game sequence
    gameseq.push(randcolor);
}

function btnpress() {
    const btn = this;
    userflash(btn);
    const usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans();
}

const allbtns = document.querySelectorAll(".btn");
for (const btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function checkans() {
    for (let i = 0; i < userseq.length; i++) {
        if (userseq[i] !== gameseq[i]) {
            h2.innerHTML = `Game Over !! Your Score was <b>${level}</b> <br> Press Any key to start`
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(function() {
                document.querySelector("body").style.backgroundColor = "white";
            }, 100)
            if (level > highscore) {
                highscore = level;
                highscoreDisplay.innerText = highscore;
            }
            started = false;
            return;
        }
    }
    
    if (userseq.length === gameseq.length) {
        setTimeout(levelup, 1000);
    }
}
