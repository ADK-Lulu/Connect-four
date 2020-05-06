class Board {

  constructor(game) {
    if (!(game instanceof Game)) {
      throw (new Error("game must be an instance of Game"))
    }
    this.game = game;
    this.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    
    this.currentPlayer = 1;
    this.playInProgress = false;
    this.addEventListener();
    this.render();
    game.tellTurn(this.currentPlayer);
  }

  async makeMove(column) {

    if (!Number.isInteger(column) || column < 0 || column > 6) {
      throw (new Error('column must be an integer between 0 and 6'))
    }
    if (this.playInProgress === true) {
      return null;
    }

    let flatMatrix = this.matrix.flat();

    switch (column) {

      case 0: if (flatMatrix.filter((item, index) => index % 7 === 0).indexOf(0) === -1) { return false };
        break;
      case 1: if (flatMatrix.filter((item, index) => index % 7 === 1).indexOf(0) === -1) { return false };
        break;
      case 2: if (flatMatrix.filter((item, index) => index % 7 === 2).indexOf(0) === -1) { return false };
        break;
      case 3: if (flatMatrix.filter((item, index) => index % 7 === 3).indexOf(0) === -1) { return false };
        break;
      case 4: if (flatMatrix.filter((item, index) => index % 7 === 4).indexOf(0) === -1) { return false };
        break;
      case 5: if (flatMatrix.filter((item, index) => index % 7 === 5).indexOf(0) === -1) { return false };
        break;
      case 6: if (flatMatrix.filter((item, index) => index % 7 === 6).indexOf(0) === -1) { return false };
        break;
    }
    
    this.playInProgress = true;

    for (let row = 0; row < this.matrix.length; row++) {
      if (this.matrix[row][column] === 0) {
        this.matrix[row][column] = this.currentPlayer;

        this.render();
        await sleep(50);

        if (row + 1 < 6) {
          if (this.matrix[row + 1][column] !== 0) {
            break;
          }
          else if (this.matrix[row][column] = 0) {
            this.playInProgress = false
          }
        }
      }
    }
    
    let winCheck = this.winCheck();
      
    if (winCheck) {
        this.removeEventListener();
    if (winCheck.combo) {
        this.markWin(winCheck.combo);
      }
      this.game.over(winCheck.winner);
      return true;
      }
    
    this.currentPlayer === 1 ? this.currentPlayer = 2
      : this.currentPlayer = 1;

    this.game.tellTurn(this.currentPlayer);
    this.playInProgress = false;
    return true;
  }

  winCheck() {
    
    let winnerObject = {};
    let combo = [];

    let winOffset = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],    
      [[0, 0], [1, 0], [2, 0], [3, 0]],    
      [[0, 0], [1, 1], [2, 2], [3, 3]],     
      [[0, 0], [1, -1], [2, -2], [3, -3]]     
    ];

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        for (let w of winOffset) {
          let slots = w.map(([r, c]) =>
            this.matrix[row + r] && this.matrix[row + r][col + c]).join('');
          
          let countMoves = 0;
          let gameSlots = this.matrix.flat();

          for (let slot of gameSlots) {
            if (slot !== 0) {
              countMoves++
            }
          }
          if (slots === '1111' || slots === '2222') {
            for (let win of w) {
              combo.push([row + win[0], col + win[1]]);
            }
            return winnerObject = {
              winner: +slots[0],
              combo: combo
            }
          } else if (countMoves === 42) {
            return winnerObject = {
              winner: 'draw'
            }
          }
        }
      }
    }
    return false;
  }

  render() {

    $('.board').innerHTML = `
      ${this.matrix.flat().map((x, i) => `
        <div class="${['', 'red', 'yellow'][x]}">
          <div></div>
        </div>
      `).join('')}
    `;
  }

  markWin(combo) {

    for (let div of combo) {
      let rowOfWin = div[0];
      let colOfWin = div[1];
      let position = rowOfWin * 7 + colOfWin + 1; 
      let markedPosition;
      
      for (let i = 0; i <= 42; i++) {
        if (i !== position) { continue }
        else {
          markedPosition = $(".board > div:nth-child(" + i + ")");
          markedPosition.classList.add('win');
        }
      }
    }
  }
   
  addEventListener() {

    this.listener = event => {
      let $clicked = event.target.closest('.board>div');
      if (!$clicked) { return }
      let $allClicked = [...$$('.board>div')];
      let index = $allClicked.indexOf($clicked);
      let column = index % 7;
      this.makeMove(column);
    }
    $('.board').addEventListener('click', this.listener);
  }

  removeEventListener() {
    $('.board').removeEventListener('click', this.listener);
  }

}

if (typeof global !== 'undefined') { global.Board = Board };