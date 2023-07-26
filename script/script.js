const gameBoard = (() => {
  const _board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let playerOne, playerTwo = null;

  function markOnBoard(position, playerSymbol) {
    if (_board[position] === " ") {
      _board[position] = playerSymbol;
    } else {
      console.log("ERROR, position already marked!");
      playMove(playerSymbol);
    }
  }

  function validateMove(move) {
    if (isNaN(move) || move < 0 || move > 8 ) {
      return false;
    }

    return true;
  }

  function playMove(playerSymbol) {
    let move = parseInt(prompt("Player "+ playerSymbol + " move"));
    move--

    if (validateMove(move)) {
      markOnBoard(move, playerSymbol);
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

  function checkTie(moveCount) {
      if (moveCount == 9) {
        return true;
      };

    return false;
  }

  function game() {
    playerOne = Player("X");
    console.log(playerOne.playerSymbol)
    playerTwo = Player("O");

    let moveCount = 0;
    printBoard();
    do {
      console.log("Player X turn: ");
      playMove(playerOne.playerSymbol);
      moveCount++
      if (checkVictory(playerOne.playerSymbol)) {
        console.log("Player X WINS!");
        printBoard();
        break;
      } else if (checkTie(moveCount)) {
        console.log("TIE!")
        break;
      };   

      printBoard();

      console.log("Player O turn: ");
      playMove(playerTwo.playerSymbol);
      moveCount++
      if (checkVictory(playerTwo.playerSymbol)) {
        console.log("Player O WINS!")
        printBoard();
        break;
      } else if (checkTie(moveCount)) {
        console.log("TIE!")
        printBoard();
        break;
      };

      printBoard();
    } while(moveCount);
  }

  return {
    printBoard,
    game
  }
})();

const Player = (symbol) => {
  const playerSymbol = symbol

  return {
    playerSymbol
  }
}
