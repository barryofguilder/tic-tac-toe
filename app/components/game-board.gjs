import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import emoji from 'tic-tac-toe/utils/emoji';
import GamePiece from './game-board/game-piece';
import GameBoardCell from './game-board/cell';
import eq from 'ember-truth-helpers/helpers/eq';
import { on } from '@ember/modifier';
import chunk from 'ember-composable-helpers/helpers/chunk';

export default class GameBoardComponent extends Component {
  @service gameState;
  @tracked cells;

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

  <template>
    <div class="flex items-end justify-center">
      <div class="px-2 sm:px-4">
        <button
          type="button"
          class="rounded border border-violet-400 px-3 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-violet-400 hover:text-violet-800 focus:outline-none focus:ring focus:ring-teal-400"
          {{on "click" this.newGame}}
        >
          New Game
        </button>
      </div>

      <div class="flex flex-col items-center px-2 sm:px-4">
        <label for="player-1" class="font-semibold">
          Player 1
        </label>

        <div class="mt-1 flex">
          <select
            id="player-1"
            class="appearance-none rounded border border-violet-400 bg-transparent px-2 text-3xl leading-normal shadow focus:outline-none focus:ring focus:ring-teal-400"
            {{on "change" this.playerOneSelection}}
          >
            {{#each emoji as |gamePiece|}}
              <option
                class="bg-red-500"
                value={{gamePiece}}
                selected={{if (eq this.gameState.playerOne gamePiece) true}}
                disabled={{if (eq this.gameState.playerTwo gamePiece) true}}
              >
                <GamePiece @piece={{gamePiece}} />
              </option>
            {{/each}}
          </select>
        </div>
      </div>

      <div class="flex flex-col items-center px-2 sm:px-4">
        <label for="player-2" class="font-semibold">
          Player 2
        </label>

        <div class="mt-1 flex">
          <select
            id="player-2"
            class="appearance-none rounded border border-violet-400 bg-transparent px-2 text-3xl leading-normal shadow focus:outline-none focus:ring focus:ring-teal-400"
            {{on "change" this.playerTwoSelection}}
          >
            {{#each emoji as |gamePiece|}}
              <option
                class="bg-red-500"
                value={{gamePiece}}
                selected={{if (eq this.gameState.playerTwo gamePiece) true}}
                disabled={{if (eq this.gameState.playerOne gamePiece) true}}
              >
                <GamePiece @piece={{gamePiece}} />
              </option>
            {{/each}}
          </select>
        </div>
      </div>
    </div>

    {{#if this.gameState.isTieGame}}
      <div class="mt-6 flex justify-center">
        <div class="rounded bg-teal-300 px-4 py-2 text-2xl text-teal-800 shadow-lg">
          🐈 Cat tail 🐈
        </div>
      </div>
    {{else if this.gameState.gameEnded}}
      <div class="mt-6 flex justify-center">
        <div class="rounded bg-teal-300 px-4 py-2 text-2xl text-teal-800 shadow-lg">
          🎉 Player
          {{this.gameState.currentPlayer}}
          wins 🎉
        </div>
      </div>
    {{/if}}

    <div class="flex flex-col items-center p-4 pt-8">
      {{#each (chunk 3 this.cells) as |row|}}
        <div class="flex items-center justify-center">
          {{#each row as |cell|}}
            <div class="m-1 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32">
              <GameBoardCell @data={{cell}} @onClick={{this.makeSelection}} />
            </div>
          {{/each}}
        </div>
      {{/each}}
    </div>
  </template>
}
