import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import emoji from 'tic-tac-toe/utils/emoji';

export default class GameBoardComponent extends Component {
  @service gameState;
  @tracked cells;
  gamePieces = emoji;

  constructor() {
    super(...arguments);

    this.cells = this.gameState.newGame();
  }

  @action
  makeSelection(cell) {
    cell.player = this.gameState.currentPlayer;
    this.gameState.selectionMade();
  }

  @action
  newGame() {
    this.cells = this.gameState.newGame();
  }

  @action
  playerOneSelection(event) {
    const selectedPiece = event.target.value;

    if (this.gameState.playerTwo !== selectedPiece) {
      this.gameState.playerOne = selectedPiece;
    }
  }

  @action
  playerTwoSelection(event) {
    const selectedPiece = event.target.value;

    if (this.gameState.playerOne !== selectedPiece) {
      this.gameState.playerTwo = selectedPiece;
    }
  }
}
