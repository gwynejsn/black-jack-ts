import Config from './Config.js';
import Dealer from './Dealer.js';
import DeckBuilder from './DeckBuilder.js';
import MenuUIHandler from './MenuUIHandler.js';
import Player from './Player.js';
import StatusUIHandler from './StatusUIHandler.js';
import TableUIHandler from './TableUIHandler.js';
import User from './User.js';
import UserEvents from './UserEvents.js';
import Utility from './Utility.js';
import WinnerUIHandler from './WinnerUIHandler.js';

export default class Game {
  private menuUIHandler: MenuUIHandler;
  private userEvents: UserEvents;
  private statusUIHandler: StatusUIHandler;
  private tableUIHandler: TableUIHandler;
  private config: Config;
  private deckBuilder: DeckBuilder;
  private winnerUIHandler: WinnerUIHandler;

  private user: User;
  private dealer: Dealer;

  constructor() {
    console.log('initializing game...');
    this.config = new Config();
    this.menuUIHandler = new MenuUIHandler(this.config);
    this.user = new User(this.config);
    this.dealer = new Dealer();
    this.statusUIHandler = new StatusUIHandler(this.user, this);
    this.tableUIHandler = new TableUIHandler();
    this.deckBuilder = new DeckBuilder(this.config, this.tableUIHandler);
    this.winnerUIHandler = new WinnerUIHandler();
    this.userEvents = new UserEvents(
      this.config,
      this.user,
      this.statusUIHandler,
      this.deckBuilder
    );

    this.init();
  }

  private async init() {
    await this.menuUIHandler.initializeMainMenu();
    this.user.setMoney(this.config.getStartingMoney());
    this.statusUIHandler.updateUserMoney(); // update based on config
    this.userEvents.updateBetInputPlaceholder(this.config);

    let roundNo = 0;
    while (this.user.getMoney() >= this.config.getMinBet()) {
      roundNo++;
      this.statusUIHandler.updateRoundNo(roundNo);
      const winner = await this.startRound();
      await this.winnerUIHandler.displayWinner(winner);
      if (winner instanceof User)
        this.user.setMoney(this.user.getMoney() + this.user.getBet() * 1.5);
    }
  }

  public async startRound(): Promise<Player> {
    const players = [this.user, this.dealer];
    this.deckBuilder.cleanDeck(players); // start with a clean deck
    // user turn
    // ask to enter bet first
    await this.userEvents.askBet();

    // distribute cards
    this.deckBuilder.distributeCards(players);
    this.tableUIHandler.displayCards(players, true);

    // ask for actions
    await this.userEvents.askAction();

    // verify if bust, dealer wins
    if (this.isBust(this.user)) return this.dealer;

    // dealer turn
    await this.dealer.askAction(this.deckBuilder);
    console.log(this.dealer.getMoleCard());

    // verify if bust, user wins
    if (this.isBust(this.user)) return this.user;

    // evaluate winner
    return this.getWinner(players)!;
  }

  private isBust(player: Player) {
    if (Utility.computeTotalPts(player) > 21) return true;
    else return false;
  }

  private getWinner(players: Player[]): Player | null {
    let winner: Player | null = null;
    let isDraw = false;

    players.forEach((player) => {
      const currentPts = Utility.computeTotalPts(player);

      if (!winner) {
        winner = player;
        isDraw = false;
        return;
      }

      const bestPts = Utility.computeTotalPts(winner);

      if (currentPts > bestPts) {
        winner = player;
        isDraw = false;
      } else if (currentPts === bestPts) {
        winner = null;
        isDraw = true;
      }
      // if currentPts < bestPts, do nothing
    });

    return winner;
  }
}

new Game();
