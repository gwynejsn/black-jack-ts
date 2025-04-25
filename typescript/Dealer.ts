import Card from './Card.js';
import Player from './Player.js';

export default class Dealer extends Player {
  private moleCard: Card | null;

  constructor() {
    super();
    this.moleCard = null;
  }

  public addCard(card: Card) {
    if (super.getCards().length == 0) this.moleCard = card;
    super.addCard(card);
  }

  public getMoleCard() {
    return this.moleCard;
  }
}
