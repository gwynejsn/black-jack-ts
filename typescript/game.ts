import Config from './Config.js';
import Dealer from './Dealer.js';
import DeckBuilder from './DeckBuilder.js';
import StatusUIHandler from './StatusUIHandler.js';
import TableUIHandler from './TableUIHandler.js';
import User from './User.js';
import UserEvents from './UserEvents.js';

export default class Game {
  private userEvents: UserEvents;
  private statusUIHandler: StatusUIHandler;
  private tableUIHandler: TableUIHandler;
  private config: Config;
  private deckBuilder: DeckBuilder;

  private user: User;
  private dealer: Dealer;

  constructor() {
    console.log('initializing game...');
    this.config = new Config();
    this.userEvents = new UserEvents(this, this.config);
    this.statusUIHandler = new StatusUIHandler(this.config);
    this.tableUIHandler = new TableUIHandler(this.config);
    this.deckBuilder = new DeckBuilder(this.config);
    this.user = new User();
    this.dealer = new Dealer();

    this.startRound();
  }

  public playerHit() {}
  public playerStand() {}
  public playerBet() {}

  private startRound() {
    this.deckBuilder.distributeCards([this.user, this.dealer]);
    this.tableUIHandler.displayCards([this.user, this.dealer], true);
  }
}

new Game();
