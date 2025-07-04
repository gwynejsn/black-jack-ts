import Card from './Card.js';
import Config from './Config.js';
import Player from './Player.js';
import TableUIHandler from './TableUIHandler.js';

export default class DeckBuilder {
  private suits: string[];
  private ranks: number[];
  private uniqueChecker;

  private config: Config;
  private tableUIHandler: TableUIHandler;

  constructor(config: Config, tableUIHandler: TableUIHandler) {
    this.uniqueChecker = new Set<string>();
    this.suits = ['H', 'D', 'S', 'C'];
    this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11 = J, 12 = K, 13 = Q, 14 = A

    this.config = config;
    this.tableUIHandler = tableUIHandler;
  }

  public cleanDeck(players: Player[]) {
    this.uniqueChecker.clear();
    this.tableUIHandler.clearTable();
    players.forEach((player) => player.removeAllCards());
  }

  public distributeCards(players: Player[]) {
    players.forEach((player) => {
      for (let i = 0; i < this.config.getStartingNoOfCards(); i++)
        player.addCard(this.generateCard());
    });
  }

  private generateCard() {
    let randomCard: Card;
    do {
      randomCard = new Card(
        this.suits[this.randomNo(this.suits.length)],
        this.ranks[this.randomNo(this.ranks.length)]
      );
    } while (this.uniqueChecker.has(randomCard.getFileName()));

    this.uniqueChecker.add(randomCard.getFileName());
    return randomCard;
  }

  private randomNo(length: number) {
    return Math.floor(Math.random() * length);
  }

  public addCard(player: Player) {
    player.addCard(this.generateCard());
    this.tableUIHandler.displayAddedCard(player);
  }
}
