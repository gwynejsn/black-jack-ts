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
    removeCards() {
        this.userSide.innerHTML = '';
        this.dealerSide.innerHTML = '';
    }
    displayCards(players, hideMoleCard = true) {
        players.forEach((player) => {
            const playerCards = player.getCards();
            if (player instanceof User)
                playerCards.forEach((card) => this.userSide.appendChild(this.cardUIBuilder(card.getFileName())));
            else if (player instanceof Dealer)
                playerCards.forEach((card) => {
                    const moleCard = player.getMoleCard();
                    if (card.getFileName() == (moleCard === null || moleCard === void 0 ? void 0 : moleCard.getFileName()) && hideMoleCard)
                        this.dealerSide.appendChild(this.cardUIBuilder('/resources/cards/BACK.png'));
                    else
                        this.dealerSide.appendChild(this.cardUIBuilder(card.getFileName()));
                });
        });
    }
    displayAddedCard(player) {
        const playerCards = player.getCards();
        const lastCard = playerCards[playerCards.length - 1];
        if (player instanceof User)
            this.userSide.appendChild(this.cardUIBuilder(lastCard.getFileName()));
        else if (player instanceof Dealer)
            this.dealerSide.appendChild(this.cardUIBuilder(lastCard.getFileName()));
    }
}
