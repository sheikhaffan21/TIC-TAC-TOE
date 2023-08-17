let music = new Audio("music.mp3");
let gameovermusic = new Audio("gameover.wav")
let turnmusic = new Audio("ting.mp3")
let gamehalt = new Audio("gamehalt.wav")
let turn = "X";
let isgameover = false;
let musicplaying = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!!!!"
            isgameover = true;
            gameovermusic.play()
            music.pause()
            document.querySelector(".mplay").innerText = "Play Music"
            musicplaying = false
        }
    })
    if ((boxtext[0].innerText !== "") &&
        (boxtext[1].innerText !== "") &&
        (boxtext[2].innerText !== "") &&
        (boxtext[3].innerText !== "") &&
        (boxtext[4].innerText !== "") &&
        (boxtext[5].innerText !== "") &&
        (boxtext[6].innerText !== "") &&
        (boxtext[7].innerText !== "") &&
        (boxtext[8].innerText !== "") &&
        (isgameover == false)
    ) {
        document.querySelector('.info').innerText = "Press Reset Button!"
        gamehalt.play();
        mplay = document.querySelector(".mplay");
        if (mplay.innerText === "Pause Music") {
            mplay.innerText = "Play Music"
            music.pause();
            musicplaying = false;
        }
    }
}
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (isgameover == false) {
            if (boxtext.innerText === '') {
                boxtext.innerText = turn;
                turn = changeTurn();
                turnmusic.play()
                checkWin();
                if (isgameover == false) {
                    document.querySelector('.info').innerText = "Turn for " + turn;
                }
                checkWin();
            }

        }
    })
});

reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    mplay = document.querySelector(".mplay");
    if (mplay.innerText === "Pause Music") {
        mplay.innerText = "Play Music"
        music.pause();
        musicplaying = false;
    }else if(mplay.innerText === "Play Music"){
        mplay.innerText="Pause Music"
        music.play();
        musicplaying=true;
    }
})

mplay = document.querySelector(".mplay");
mplay.addEventListener('click', function () {
    if (musicplaying == false) {
        music.play();
        mplay.innerText = "Pause Music"
    }
    else if (musicplaying == true) {
        music.pause();
        mplay.innerText = "Play Music"
    }
    musicplaying = !musicplaying;
})