import Card from './Card.js';
import DeckBuilder from './DeckBuilder.js';
import Player from './Player.js';
import Utility from './Utility.js';

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

  public askAction(deckBuilder: DeckBuilder): Promise<void> {
    return new Promise((resolve) => {
      while (true) {
        if (!this.shouldDealerHit()) break;
        deckBuilder.addCard(this);
      }
      resolve();
    });
  }

  private shouldDealerHit() {
    const currPts = Utility.computeTotalPts(this);
    return currPts < 17;
  }
}
