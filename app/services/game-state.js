import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class Cell {
  @tracked shape = null;
}

const GAME_PIECES = ['poo', 'face heart eyes', 'silly face', 'horse rider'];

export default class UserTurnService extends Service {
  @tracked cells;
  currentTurn;

  @tracked playerOne = GAME_PIECES[0];
  @tracked playerTwo = GAME_PIECES[1];

  newGame() {
    this.currentTurn = 'X';
    this.cells = [];

    for (let i = 0; i < 9; i++) {
      this.cells.push(new Cell());
    }

    return this.cells;
  }

  selectionMade() {
    if (this.currentTurn === 'X') {
      this.currentTurn = 'O';
    } else {
      this.currentTurn = 'X';
    }
  }
}
