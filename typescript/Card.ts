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
    switch (this.rank) {
      case 11:
        return '/resources/cards/' + 'J-' + this.suit + '.png';
      case 12:
        return '/resources/cards/' + 'K-' + this.suit + '.png';
      case 13:
        return '/resources/cards/' + 'Q-' + this.suit + '.png';
      case 14:
        return '/resources/cards/' + 'A-' + this.suit + '.png';
      default:
        return '/resources/cards/' + this.rank + '-' + this.suit + '.png';
    }
  }
}
