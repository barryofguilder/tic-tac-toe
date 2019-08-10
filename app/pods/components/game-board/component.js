import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GameBoardComponent extends Component {
  @service gameState;
  @tracked cells;

  constructor() {
    super(...arguments);

    this.cells = this.gameState.newGame();
  }

  @action
  makeSelection(cell) {
    cell.shape = this.gameState.currentTurn;
    this.gameState.selectionMade();
  }

  @action
  newGame() {
    this.cells = this.gameState.newGame();
  }

  @action
  playerOneSelection(selection) {
    if (this.gameState.playerTwo !== selection) {
      this.gameState.playerOne = selection;
    }
  }

  @action
  playerTwoSelection(selection) {
    if (this.gameState.playerOne !== selection) {
      this.gameState.playerTwo = selection;
    }
  }
}
