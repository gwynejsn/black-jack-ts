import { ComponentBuilder as CB } from './ComponentBuilder.js';
import Dealer from './Dealer.js';
import Player from './Player.js';
import User from './User.js';

export default class TableUIHandler {
  private userSide: HTMLDivElement;
  private dealerSide: HTMLDivElement;

  constructor() {
    this.userSide = document.querySelector('.player-cards') as HTMLDivElement;
    this.dealerSide = document.querySelector('.dealer-cards') as HTMLDivElement;
  }

  private cardUIBuilder(cardImgSrc: string, classToBeAdded: string[] = []) {
    const cardImg = CB.imageBuilder(cardImgSrc, classToBeAdded);
    return CB.containerBuilder(['card'], cardImg);
  }

  public clearTable() {
    this.userSide.innerHTML = '';
    this.dealerSide.innerHTML = '';
  }

  public displayCards(players: Player[], hideMoleCard: boolean = true) {
    this.clearTable(); // Always start fresh
    console.log('Displaying cards...');

    players.forEach((player) => {
      const cards = player.getCards();

      if (player instanceof User) {
        cards.forEach((card) => {
          const cardElement = this.cardUIBuilder(card.getFileName());
          this.userSide.appendChild(cardElement);
        });
      } else if (player instanceof Dealer) {
        cards.forEach((card) => {
          const moleCard = player.getMoleCard();
          const isMole =
            moleCard && card.getFileName() === moleCard.getFileName();

          if (isMole && hideMoleCard) {
            const moleElement = this.cardUIBuilder(
              'resources/cards/BACK.png',
              ['mole-card']
            );
            this.dealerSide.appendChild(moleElement);
          } else {
            const cardElement = this.cardUIBuilder(card.getFileName());
            this.dealerSide.appendChild(cardElement);
          }
        });
      }
    });
  }

  public revealMoleCard(dealer: Dealer) {
    const moleCardElement = this.dealerSide.querySelector(
      '.mole-card'
    ) as HTMLImageElement;

    if (moleCardElement && dealer.getMoleCard()) {
      moleCardElement.src = dealer.getMoleCard()!.getFileName();
    } else {
      console.warn('No mole card found to reveal.');
    }
  }

  public displayAddedCard(player: Player) {
    const cards = player.getCards();
    const lastCard = cards[cards.length - 1];
    const cardElement = this.cardUIBuilder(lastCard.getFileName());

    if (player instanceof User) {
      this.userSide.appendChild(cardElement);
    } else if (player instanceof Dealer) {
      this.dealerSide.appendChild(cardElement);
    }
  }
}
