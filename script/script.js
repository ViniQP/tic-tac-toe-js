const Player = (symbol, name) => {
  const playerSymbol = symbol;
  const playerName = name;

  return {
    playerSymbol,
    playerName
  }
}

const gameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return _board;
  }

  function markOnBoard(position, playerSymbol) {
    if (_board[position] === "") {
      _board[position] = playerSymbol;
      return true;
    } else {
      console.log("ERROR, position already marked!");
      displayController.showPositionError();
      return false;
    }
  }

  function validateMove(move) {
    if (isNaN(move) || move < 0 || move > 8 ) {
      return false;
    }

    return true;
  }

  function playTurn(move, playerSymbol) {

    if (validateMove(move)) {
      return markOnBoard(move, playerSymbol)
    } else {
      console.log("Invalid Move!");
      playMove(playerSymbol);
    }
  };

  function printBoard() {
    console.log(_board[0] + " | " + _board[1] + " | "  + _board[2] + "\n"
    + _board[3] + " | " + _board[4] + " | "  + _board[5] + "\n"
    + _board[6] + " | " + _board[7] + " | "  + _board[8] + "\n"
    )
  }

  function checkVictory(playerSymbol) {
    let conditionStatus = false;
    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], 
                                 [0,3,6], [1,4,7], [2,5,8], 
                                 [0,4,8], [2,4,6]
                                ]

    winningCombinations.forEach( combination => {
      let count = 0;
      combination.forEach( position => {
        if (_board[position] === playerSymbol) {
          count++
        }
      });

      if (count === 3) {
        console.log("Player " + playerSymbol + " has won!")
        conditionStatus = true;
      }
    });

    return conditionStatus;
  }

  function checkTie() {
    for (let i = 0; i < 9; i++) {
      if (_board[i] === "") {
        return false
      }
    }

    return true
  }

  // function game() {
  //   playerOne = Player("X", prompt("Insert the Player 1 name"));
  //   console.log(playerOne.playerSymbol)
  //   playerTwo = Player("O", prompt("Insert the Player 2 name"));

  //   let moveCount = 0;
  //   printBoard();
  //   do {
  //     console.log("Player X turn: ");
  //     displayController.tellTurn(playerOne.playerName)
  //     playMove(playerOne.playerSymbol);
  //     moveCount++
  //     if (checkVictory(playerOne.playerSymbol)) {
  //       console.log("Player X WINS!");
  //       printBoard();
  //       break;
  //     } else if (checkTie(moveCount)) {
  //       console.log("TIE!")
  //       break;
  //     };   

  //     printBoard();

  //     console.log("Player O turn: ");
  //     displayController.tellTurn(playerTwo.playerName)
  //     playMove(playerTwo.playerSymbol);
  //     moveCount++
  //     if (checkVictory(playerTwo.playerSymbol)) {
  //       console.log("Player O WINS!")
  //       printBoard();
  //       break;
  //     } else if (checkTie(moveCount)) {
  //       console.log("TIE!")
  //       printBoard();
  //       break;
  //     };

  //     printBoard();
  //   } while(moveCount);
  // }


  return {
    getBoard,
    printBoard,
    playTurn,
    checkVictory,
    checkTie
  }
})();

const displayController = (() => {
  const boardPlace = document.getElementById("board-place");
  const resetButton = document.getElementById("reset-button");

  resetButton.onclick = () => {
    location.reload();
  }

  function printBoard(board) {
    let count = 0;
    board.forEach( position => {
      const positionDiv = document.createElement("div");
      positionDiv.classList.add("position-square");
      positionDiv.id = count;
      positionDiv.innerText = position;

      positionDiv.onclick = () => {
        gameController.game.playRound(positionDiv);
      }
      
      boardPlace.appendChild(positionDiv);
      count++
    })
  }

  function updateTile(tile, playerSymbol) {
    if (tile.innerText === "") {
      tile.innerText = playerSymbol
    }
  }

  function tellTurn(playerName) {
    const infoParagraph = document.getElementById("info-paragraph");
    infoParagraph.textContent = "It's " + playerName + " turn!";
  }

  function congratulateVictory(playerName) {
    const infoParagraph = document.getElementById("info-paragraph");
    infoParagraph.textContent = "" + playerName + " has won!";
  }

  function showTie() {
    const infoParagraph = document.getElementById("info-paragraph");
    infoParagraph.textContent = "TIE!";
  }

  function showPositionError() {
    const infoParagraph = document.getElementById("info-paragraph");
    infoParagraph.textContent = "Position already marked!";
  }

  return {
    printBoard,
    updateTile,
    tellTurn,
    congratulateVictory,
    showTie,
    showPositionError
  }
})();

const gameController = (() => {
  function createPlayer(symbol, name) {
    let player = Player(symbol, name);

    return player;
  }

  const game = (() => {
    displayController.printBoard(gameBoard.getBoard());

    let playerOne = createPlayer("X", "Player 1");
    let playerTwo = createPlayer("O", "Player 2");
    let currentPlayer = playerOne;
    
    function swapPlayer() {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo
      } else {
        currentPlayer = playerOne
      }
    }

    function playRound(tile) {
          TurnStatus = gameBoard.playTurn(tile.id, currentPlayer.playerSymbol);
          displayController.updateTile(tile, currentPlayer.playerSymbol);

          if (TurnStatus) {
            if (gameBoard.checkVictory(currentPlayer.playerSymbol)) {
              displayController.congratulateVictory(currentPlayer.playerName);
              return
            } else if (gameBoard.checkTie()) {
              displayController.showTie();
              return
            }
            else {
              swapPlayer();
            }
          }
    }

    return {
      playRound
    }
  })();

  return {
    game
  }
  

})();
