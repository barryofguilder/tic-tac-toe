import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GameBoardCellComponent extends Component {
  @service gameState;

  get isWinCell() {
    return this.gameState.gameEnded && this.gameState.winState.includes(this.args.data.index);
  }

  @action
  onClick() {
    if (!this.args.data.player && !this.gameState.gameEnded) {
      this.args.onClick(this.args.data);
    }
  }
}
