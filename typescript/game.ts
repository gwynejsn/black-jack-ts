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
    this.config = new Config();
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
    this.menuUIHandler = new MenuUIHandler(
      this.config,
      this.user,
      this.statusUIHandler,
      this.userEvents
    );

    this.init();
  }

  private async init() {
    await this.menuUIHandler.initializeMainMenu(); // also asks for configurations
    await this.startGame();
  }

  private async startGame() {
    let roundNo = 0;
    while (this.user.getMoney() >= this.config.getMinBet()) {
      roundNo++;
      this.statusUIHandler.updateRoundNo(roundNo);
      const winner = await this.startRound();
      // add reward
      if (winner instanceof User) {
        this.user.setMoney(this.user.getMoney() + this.user.getBet() * 1.5);
        this.statusUIHandler.updateUserMoney();
      }
      await this.winnerUIHandler.displayWinner(winner);
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

    // verify if user is bust, dealer wins
    if (this.isBust(this.user)) {
      this.tableUIHandler.revealMoleCard(this.dealer);
      return this.dealer;
    }

    // dealer turn
    await this.dealer.askAction(this.deckBuilder);
    console.log(this.dealer.getMoleCard());

    // verify if dealer is bust, user wins
    if (this.isBust(this.dealer)) {
      this.tableUIHandler.revealMoleCard(this.dealer);
      return this.user;
    }

    // evaluate winner
    this.tableUIHandler.revealMoleCard(this.dealer);
    return this.getWinner(players)!;
  }

  private isBust(player: Player) {
    if (Utility.computeTotalPts(player) > 21) return true;
    else return false;
  }

  private getWinner(players: Player[]): Player | null {
    console.log(
      Utility.computeTotalPts(players[0]) +
        ' vs ' +
        Utility.computeTotalPts(players[1])
    );
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
