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
  private deckBuilder: DeckBuilder;
  private config: Config;

  constructor(
    config: Config,
    user: User,
    statusUIHandler: StatusUIHandler,
    deckBuilder: DeckBuilder
  ) {
    this.hitBtn = document.querySelector('.hit') as HTMLButtonElement;
    this.standBtn = document.querySelector('.stand') as HTMLButtonElement;
    this.disableActionBtns(true); // disable hit and stand in first start

    this.betBtn = document.querySelector('.submit-bet') as HTMLButtonElement;
    this.betInput = document.querySelector('#bet') as HTMLInputElement;
    this.updateBetInputPlaceholder(config);

    this.user = user;
    this.statusUIHandler = statusUIHandler;
    this.deckBuilder = deckBuilder;
    this.config = config;
  }

  public updateBetInputPlaceholder(config: Config) {
    this.betInput.defaultValue = config.getMinBet() + '';
  }

  private hitHandler = () => {};
  private standHandler = () => {};

  public askAction(): Promise<void> {
    return new Promise((resolve) => {
      // remove old listeners
      this.hitBtn.removeEventListener('click', this.hitHandler);
      this.standBtn.removeEventListener('click', this.standHandler);

      // define new handlers
      this.hitHandler = () => this.deckBuilder.addCard(this.user);

      this.standHandler = () => resolve();

      // add listeners
      this.hitBtn.addEventListener('click', this.hitHandler);
      this.standBtn.addEventListener('click', this.standHandler, {
        once: true,
      });
    });
  }

  public askBet(): Promise<void> {
    return new Promise((resolve) => {
      this.disableBetInput(false);
      this.disableBetBtn(false);
      this.disableActionBtns(true); // disable hit and stand
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
      if (bet < this.config.getMinBet()) throw 'minimum bet not met.';
      if (bet > this.user.getMoney()) throw 'not enough money.';
      if (bet <= 0 || isNaN(bet)) throw 'wrong input.';
      this.betInput.classList.remove('wrong-input');
      this.disableBetBtn(false);
    } catch (err) {
      console.log(err);
      this.betInput.classList.add('wrong-input');
      this.disableBetBtn(true);
    }
  }

  public setUserBet() {
    this.user.setBet(Number(this.betInput.value));
    this.user.setMoney(this.user.getMoney() - Number(this.betInput.value));
    this.statusUIHandler.updateUserMoney();
    this.disableBetInput(true);
    this.disableBetBtn(true);
    this.disableActionBtns(false);
  }

  public disableActionBtns(to: boolean) {
    this.hitBtn.disabled = to;
    this.standBtn.disabled = to;
  }

  public disableBetBtn(to: boolean) {
    this.betBtn.disabled = to;
  }

  public disableBetInput(to: boolean) {
    this.betInput.disabled = to;
  }
}
