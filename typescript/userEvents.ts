import Config from './Config.js';
import DeckBuilder from './DeckBuilder.js';
import StatusUIHandler from './StatusUIHandler.js';
import User from './User.js';

export default class UserEvents {
  // Inputs and button elements
  private betInput: HTMLInputElement;
  private hitBtn: HTMLButtonElement;
  private standBtn: HTMLButtonElement;
  private betBtn: HTMLButtonElement;

  // Game-related properties
  private user: User;
  private statusUIHandler: StatusUIHandler;
  private deckBuilder: DeckBuilder;
  private config: Config;

  // Stored resolve functions
  private resolveBet?: () => void;
  private resolveAction?: () => void;

  constructor(
    config: Config,
    user: User,
    statusUIHandler: StatusUIHandler,
    deckBuilder: DeckBuilder
  ) {
    this.hitBtn = document.querySelector('.hit') as HTMLButtonElement;
    this.standBtn = document.querySelector('.stand') as HTMLButtonElement;
    this.betBtn = document.querySelector('.submit-bet') as HTMLButtonElement;
    this.betInput = document.querySelector('#bet') as HTMLInputElement;

    this.user = user;
    this.statusUIHandler = statusUIHandler;
    this.deckBuilder = deckBuilder;
    this.config = config;

    this.initialize();

    // Set up bet button only once
    this.betBtn.addEventListener('click', this.onBetButtonClick);
  }

  private initialize() {
    this.toggleActionBtns(true);
    this.updateBetInputPlaceholder();
  }

  public updateBetInputPlaceholder() {
    this.betInput.defaultValue = this.config.getMinBet().toString();
  }

  public askAction(): Promise<void> {
    return new Promise((resolve) => {
      this.cleanupActionListeners(); // Always clean first
      this.resolveAction = resolve;

      this.hitHandler = this.handleHit.bind(this);
      this.standHandler = this.handleStand.bind(this);

      this.hitBtn.addEventListener('click', this.hitHandler);
      this.standBtn.addEventListener('click', this.standHandler);
    });
  }

  public askBet(): Promise<void> {
    return new Promise((resolve) => {
      this.cleanupBetListeners(); // Always clean first
      this.resolveBet = resolve;

      this.toggleActionBtns(true);
      this.toggleBetBtn(false);
      this.toggleBetInput(false);

      this.betInput.addEventListener('input', this.betValidator);
    });
  }

  private handleHit() {
    this.deckBuilder.addCard(this.user);
  }

  private handleStand() {
    this.resolveAction?.();
    this.cleanupActionListeners(); // Clean up after standing
  }

  private onBetButtonClick = () => {
    if (this.betBtn.disabled) return; // prevent clicks when disabled
    this.setUserBet();
    this.resolveBet?.(); // manually resolve
    this.cleanupBetListeners(); // clean bet listeners after bet is placed
  };

  private betValidator = () => {
    let bet: number;
    try {
      bet = Number(this.betInput.value);
      if (bet < this.config.getMinBet())
        throw new Error('Minimum bet not met.');
      if (bet > this.user.getMoney()) throw new Error('Not enough money.');
      if (bet <= 0 || isNaN(bet)) throw new Error('Invalid bet input.');

      this.betInput.classList.remove('wrong-input');
      this.toggleBetBtn(false);
    } catch (err) {
      console.error(err);
      this.betInput.classList.add('wrong-input');
      this.toggleBetBtn(true);
    }
  };

  private setUserBet() {
    const betAmount = Number(this.betInput.value);
    this.user.setBet(betAmount);
    console.log('curr money ' + this.user.getMoney());
    const newMoney = this.user.getMoney() - betAmount;
    this.user.setMoney(newMoney);
    console.log('user mon ' + this.user.getMoney());
    this.statusUIHandler.updateUserMoney();
    this.toggleActionBtns(false);
    this.toggleBetInput(true);
    this.toggleBetBtn(true);
  }

  private toggleBetBtn(disable: boolean) {
    this.betBtn.disabled = disable;
  }

  private toggleActionBtns(disable: boolean) {
    this.hitBtn.disabled = disable;
    this.standBtn.disabled = disable;
  }

  private toggleBetInput(disable: boolean) {
    this.betInput.disabled = disable;
  }

  // --- CLEANUP FUNCTIONS ---

  private cleanupActionListeners() {
    this.hitBtn.removeEventListener('click', this.hitHandler);
    this.standBtn.removeEventListener('click', this.standHandler);
  }

  private cleanupBetListeners() {
    this.betInput.removeEventListener('input', this.betValidator);
  }

  // Event handlers
  private hitHandler = () => {};
  private standHandler = () => {};
}
