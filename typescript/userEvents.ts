import Config from './Config.js';
import Game from './Game.js';

export default class UserEvents {
  // inputs
  private betInput: HTMLInputElement;

  // button events
  private hitBtn: HTMLButtonElement;
  private standBtn: HTMLButtonElement;
  private betBtn: HTMLButtonElement;

  private game: Game;

  constructor(game: Game, config: Config) {
    this.hitBtn = document.querySelector('.hit') as HTMLButtonElement;
    this.standBtn = document.querySelector('.stand') as HTMLButtonElement;
    this.betBtn = document.querySelector('.submit-bet') as HTMLButtonElement;

    this.betInput = document.querySelector('#bet') as HTMLInputElement;
    this.betInput.defaultValue = config.getMinBet() + '';
    this.game = game;

    this.buttonEvents();
  }

  private buttonEvents() {
    this.hitBtn.addEventListener('click', this.game.playerHit);
    this.standBtn.addEventListener('click', this.game.playerStand);
    this.betBtn.addEventListener('click', this.game.playerBet);

    this.betInput.addEventListener('input', () => this.betValidator());
  }

  private betValidator() {
    let bet: number;
    try {
      bet = Number(this.betInput.value);
      console.log(typeof bet);
      if (bet <= 0 || isNaN(bet)) throw 'wrong input.';
      this.betInput.classList.remove('wrong-input');
      this.betBtn.disabled = false;
    } catch (err) {
      console.log(err);
      this.betInput.classList.add('wrong-input');
      this.betBtn.disabled = true;
    }
  }
}
