import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameBoardCellComponent extends Component {
  @action
  onClick() {
    this.args.onClick(this.args.data);
  }
}
