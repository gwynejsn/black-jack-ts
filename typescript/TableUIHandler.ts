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

  private cardUIBuilder(cardImgSrc: string) {
    const cardImg = CB.imageBuilder(cardImgSrc);
    return CB.containerBuilder(['card'], cardImg);
  }

  public removeCards() {
    this.userSide.innerHTML = '';
    this.dealerSide.innerHTML = '';
  }

  public displayCards(players: Player[], hideMoleCard: boolean = true) {
    console.log('displaying cards');
    players.forEach((player) => {
      const playerCards = player.getCards();
      if (player instanceof User)
        playerCards.forEach((card) =>
          this.userSide.appendChild(this.cardUIBuilder(card.getFileName()))
        );
      else if (player instanceof Dealer)
        playerCards.forEach((card) => {
          const moleCard = player.getMoleCard();
          if (card.getFileName() == moleCard?.getFileName() && hideMoleCard)
            this.dealerSide.appendChild(
              this.cardUIBuilder('/resources/cards/BACK.png')
            );
          else
            this.dealerSide.appendChild(this.cardUIBuilder(card.getFileName()));
        });
    });
  }

  public displayAddedCard(player: Player) {
    const playerCards = player.getCards();
    const lastCard = playerCards[playerCards.length - 1];

    if (player instanceof User)
      this.userSide.appendChild(this.cardUIBuilder(lastCard.getFileName()));
    else if (player instanceof Dealer)
      this.dealerSide.appendChild(this.cardUIBuilder(lastCard.getFileName()));
  }
}
