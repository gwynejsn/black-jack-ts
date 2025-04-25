import Config from './Config.js';
import DeckBuilder from './DeckBuilder.js';
import StatusUIHandler from './StatusUIHandler.js';
import User from './User.js';

export default class UserEvents {
  // inputs events
  private betInput: HTMLInputElement;

  // button events
  private hitBtn: HTMLButtonElement;
  private standBtn: HTMLButtonElement;
  private betBtn: HTMLButtonElement;

  private user: User;
  private statusUIHandler: StatusUIHandler;
  public deckBuilder: DeckBuilder;

  constructor(
    config: Config,
    user: User,
    statusUIHandler: StatusUIHandler,
    deckBuilder: DeckBuilder
  ) {
    this.hitBtn = document.querySelector('.hit') as HTMLButtonElement;
    this.hitBtn.disabled = true;
    this.standBtn = document.querySelector('.stand') as HTMLButtonElement;
    this.standBtn.disabled = true;
    this.betBtn = document.querySelector('.submit-bet') as HTMLButtonElement;

    this.betInput = document.querySelector('#bet') as HTMLInputElement;
    this.betInput.defaultValue = config.getMinBet() + '';

    this.user = user;
    this.statusUIHandler = statusUIHandler;
    this.deckBuilder = deckBuilder;
  }

  public askAction(): Promise<void> {
    return new Promise((resolve) => {
      this.hitBtn.addEventListener('click', () =>
        this.deckBuilder.addCard(this.user)
      );
      this.standBtn.addEventListener('click', () => resolve());
    });
  }

  public askBet(): Promise<void> {
    return new Promise((resolve) => {
      this.betInput.addEventListener('input', () => this.betValidator());
      this.betBtn.addEventListener('click', () => {
        this.setUserBet();
        resolve();
      });
    });
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

  public setUserBet() {
    this.user.setMoney(this.user.getMoney() - Number(this.betInput.value));
    this.statusUIHandler.updateUserMoney();
    this.betBtn.disabled = true;
    this.hitBtn.disabled = false;
    this.standBtn.disabled = false;
  }
}
