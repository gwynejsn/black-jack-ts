import Card from './Card.js';

export default class Player {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }

  public getCards() {
    return this.cards;
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public removeAllCards() {
    this.cards = [];
  }
}
