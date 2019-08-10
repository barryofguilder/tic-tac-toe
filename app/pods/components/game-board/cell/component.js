import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GameBoardCellComponent extends Component {
  @service gameState;

  @action
  onClick() {
    if (!this.args.data.shape) {
      this.args.onClick(this.args.data);
    }
  }
}
