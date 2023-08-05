import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import GamePiece from './game-piece';
import eq from 'ember-truth-helpers/helpers/eq';
import { on } from '@ember/modifier';

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

  <template>
    <button
      type="button"
      class="h-full w-full rounded-full border-4 border-transparent text-center text-5xl sm:text-6xl
        {{if this.isWinCell 'bg-teal-300' 'bg-violet-400'}}
        {{if (eq this.gameState.gameEnded false) 'hover:bg-teal-300' ''}}
        focus:outline-none focus:ring focus:ring-teal-400"
      aria-label="Board cell button"
      {{on "click" this.onClick}}
    >
      {{#if (eq @data.player 1)}}
        <GamePiece @piece={{this.gameState.playerOne}} />
      {{else if (eq @data.player 2)}}
        <GamePiece @piece={{this.gameState.playerTwo}} />
      {{/if}}
    </button>
  </template>
}
