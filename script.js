
let boxes = document.querySelectorAll(".box")
let playerTurn = document.querySelector(".player-turn")
let resetButton = document.querySelector(".reset")

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]


player1 = true
playerTurn.textContent = `Player 1's Turn (O)`

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1) {
            box.innerText = "O"
            box.style.color = "rgb(28, 218, 28)"
            playerTurn.textContent = `Player 2's Turn (X)`
            player1 = false
        }
        else {
            box.innerText = "X"
            player1 = true
            box.style.color = "rgb(160, 23, 23)"
            playerTurn.textContent = `Player 1's Turn (O)`
        }
        box.disabled = true
        CheckWinner()
    })
})

function ResetGame() {
    player1 = true
    EnableBoxes()
    playerTurn.textContent = "Player 1's Turn (O)"
    boxes.forEach((box) => {
        box.innerText = ""
    })
}

function DisableBoxes() {
    for (let box of boxes) {
        box.disabled = true
    }
}

function EnableBoxes() {
    for (let box of boxes) {
        box.disabled = false
    }
}

function CheckWinner() {
    for (let pattern of winPatterns) {

        let pos1val = boxes[pattern[0]].innerText
        let pos2val = boxes[pattern[1]].innerText
        let pos3val = boxes[pattern[2]].innerText

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                DisableBoxes()
                ShowWinner(pos1val)
            }
        }
    }

}

resetButton.addEventListener("click", ResetGame)

let winnerDiv = document.querySelector(".winner")
let gameContainer = document.querySelector(".game-container")
let gameWinner = document.querySelector(".game-winner")
let gameRunner = document.querySelector(".game-runner")
let newGameButton = document.querySelector(".new-game")

function ShowWinner(winner) {
    winnerDiv.style.display = "block"
    gameContainer.style.filter = "blur(15px)"
    gameWinner.textContent = `Winner ${winner}`
    gameRunner.textContent = `▼ Start a New game ▼`
}

function HideWinner() {
    winnerDiv.style.display = "none"
    gameContainer.style.filter = "blur(0)"
}

let closeWinner = document.querySelector(".fa-x")

closeWinner.addEventListener("click", HideWinner)

newGameButton.addEventListener("click", () => {
    HideWinner()
    ResetGame()
})