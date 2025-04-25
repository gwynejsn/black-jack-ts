import Dealer from './Dealer.js';
import User from './User.js';
export default class TableUIHandler {
    constructor(config) {
        this.userSide = document.querySelector('.player-cards');
        this.dealerSide = document.querySelector('.dealer-cards');
        this.config = config;
    }
    cardUIBuilder(cardImgSrc) {
        const cardUI = document.createElement('div');
        const cardImg = document.createElement('img');
        cardImg.src = cardImgSrc;
        cardUI.classList.add('card');
        cardUI.appendChild(cardImg);
        return cardUI;
    }
    displayCards(players) {
        players.forEach((player) => {
            const playerCards = player.getCards();
            if (player instanceof User)
                playerCards.forEach((card) => this.userSide.appendChild(this.cardUIBuilder(card.getFileName())));
            else if (player instanceof Dealer)
                playerCards.forEach((card) => this.dealerSide.appendChild(this.cardUIBuilder(card.getFileName())));
        });
    }
}
