import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import emoji from 'tic-tac-toe/utils/emoji';

class Cell {
  @tracked player = null;
  index = null;

  constructor(index) {
    this.index = index;
  }
}

const WIN_STATES = [
  // across win states
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // down win states
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal win states
  [0, 4, 8],
  [2, 4, 6]
];

export default class UserTurnService extends Service {
  @tracked cells;
  @tracked playerOne = emoji[0];
  @tracked playerTwo = emoji[1];
  @tracked gameEnded = false;
  @tracked currentPlayer;
  @tracked winState;

  get isTieGame() {
    return this.gameEnded && this.winState.length === 0;
  }

  newGame() {
    this.currentPlayer = 1;
    this.gameEnded = false;
    this.winState = [];

    let cells = [];

    for (let i = 0; i < 9; i++) {
      cells = [...cells, new Cell(i)];
    }

    this.cells = cells;

    return this.cells;
  }

  selectionMade() {
    this.determineGameEnded();

    if (this.gameEnded) {
      return;
    }

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  determineGameEnded() {
    const playerCells = this.cells.filter(cell => {
      return cell.player === this.currentPlayer;
    });

    const winState = WIN_STATES.filter(state => {
      let cell1 = playerCells.some(cell => {
        return cell.index === state[0];
      });

      let cell2 = playerCells.some(cell => {
        return cell.index === state[1];
      });

      let cell3 = playerCells.some(cell => {
        return cell.index === state[2];
      });

      return cell1 && cell2 && cell3;
    });

    if (winState.length > 0) {
      this.winState = winState[0];
      this.gameEnded = true;
      return;
    }

    const allCellsPopulated = this.cells.every(cell => {
      return cell.player !== null;
    });

    if (allCellsPopulated) {
      this.winState = [];
      this.gameEnded = true;
    }
  }
}
