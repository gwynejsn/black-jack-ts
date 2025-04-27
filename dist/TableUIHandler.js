import { ComponentBuilder as CB } from './ComponentBuilder.js';
import Dealer from './Dealer.js';
import User from './User.js';
export default class TableUIHandler {
    constructor() {
        this.userSide = document.querySelector('.player-cards');
        this.dealerSide = document.querySelector('.dealer-cards');
    }
    cardUIBuilder(cardImgSrc, classToBeAdded = []) {
        const cardImg = CB.imageBuilder(cardImgSrc, classToBeAdded);
        return CB.containerBuilder(['card'], cardImg);
    }
    removeCards() {
        this.userSide.innerHTML = '';
        this.dealerSide.innerHTML = '';
    }
    displayCards(players, hideMoleCard = true) {
        console.log('displaying cards');
        players.forEach((player) => {
            const playerCards = player.getCards();
            if (player instanceof User)
                playerCards.forEach((card) => this.userSide.appendChild(this.cardUIBuilder(card.getFileName())));
            else if (player instanceof Dealer)
                playerCards.forEach((card) => {
                    const moleCard = player.getMoleCard();
                    if (card.getFileName() == (moleCard === null || moleCard === void 0 ? void 0 : moleCard.getFileName()) && hideMoleCard)
                        this.dealerSide.appendChild(this.cardUIBuilder('/resources/cards/BACK.png', ['mole-card']));
                    else
                        this.dealerSide.appendChild(this.cardUIBuilder(card.getFileName()));
                });
        });
    }
    showMoleCard(dealer) {
        var _a;
        const moleCard = document.querySelector('.mole-card');
        moleCard.src = (_a = dealer.getMoleCard()) === null || _a === void 0 ? void 0 : _a.getFileName();
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
