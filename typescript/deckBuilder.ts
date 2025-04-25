import Card from './card.js';

export default class DeckBuilder {
  // ui for table
  private userSide: HTMLDivElement;

  private suits = ['H', 'D', 'S', 'C'];
  private ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  private uniqueChecker = new Set<string>();

  constructor() {
    console.log('deck builder');
    this.userSide = document.querySelector('.player') as HTMLDivElement;
    this.userSide.appendChild(this.cardUIBuilder());
  }

  private cardUIBuilder() {
    const cardUI = document.createElement('div');
    const cardImg = document.createElement('img');
    cardImg.src = this.generateCard().getFileName();
    cardUI.classList.add('card');
    cardUI.appendChild(cardImg);
    return cardUI;
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
}
