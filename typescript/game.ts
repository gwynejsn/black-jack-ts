import Config from './Config.js';
import Dealer from './Dealer.js';
import DeckBuilder from './DeckBuilder.js';
import StatusUIHandler from './StatusUIHandler.js';
import TableUIHandler from './TableUIHandler.js';
import User from './User.js';
import UserEvents from './UserEvents.js';
import Utility from './Utility.js';

export default class Game {
  private userEvents: UserEvents;
  private statusUIHandler: StatusUIHandler;
  private tableUIHandler: TableUIHandler;
  private config: Config;
  private deckBuilder: DeckBuilder;

  private user: User;
  private dealer: Dealer;

  private roundNo: number;

  constructor() {
    console.log('initializing game...');
    this.config = new Config();
    this.user = new User(this.config);
    this.dealer = new Dealer();
    this.statusUIHandler = new StatusUIHandler(this.user, this);
    this.tableUIHandler = new TableUIHandler(this.config);
    this.deckBuilder = new DeckBuilder(this.config, this.tableUIHandler);
    this.userEvents = new UserEvents(
      this.config,
      this.user,
      this.statusUIHandler,
      this.deckBuilder
    );

    this.roundNo = 1;

    this.startRound();
  }

  public getRoundNo() {
    return this.roundNo;
  }

  public async startRound() {
    // user turn
    // ask to enter bet first
    await this.userEvents.askBet();

    // distribute cards
    this.deckBuilder.distributeCards([this.user, this.dealer]);
    this.tableUIHandler.displayCards([this.user, this.dealer], true);

    // ask for actions
    await this.userEvents.askAction();

    // verify if bust
    if (Utility.computeTotalPts(this.user) > 21)
      console.log('bust. total is ' + Utility.computeTotalPts(this.user));
    else console.log('safe. total is ' + Utility.computeTotalPts(this.user));

    // dealer turn
    console.log('dealer turn.');
    await this.dealer.askAction(this.deckBuilder);
    console.log('computer sum: ' + Utility.computeTotalPts(this.dealer));
    console.log(this.dealer.getMoleCard());
  }
}

// get bet
// do hit or stand

new Game();
