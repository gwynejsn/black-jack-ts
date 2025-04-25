export default class Card {
  private suit: string;
  private rank: number;

  constructor(suit: string, rank: number) {
    this.suit = suit;
    this.rank = rank;
  }

  public getSuit() {
    return this.suit;
  }

  public getRank() {
    return this.rank;
  }

  public getFileName() {
    return '/resources/cards/' + this.rank + '-' + this.suit + '.png';
  }
}
