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
    clearTable() {
        this.userSide.innerHTML = '';
        this.dealerSide.innerHTML = '';
    }
    displayCards(players, hideMoleCard = true) {
        this.clearTable(); // Always start fresh
        console.log('Displaying cards...');
        players.forEach((player) => {
            const cards = player.getCards();
            if (player instanceof User) {
                cards.forEach((card) => {
                    const cardElement = this.cardUIBuilder(card.getFileName());
                    this.userSide.appendChild(cardElement);
                });
            }
            else if (player instanceof Dealer) {
                cards.forEach((card) => {
                    const moleCard = player.getMoleCard();
                    const isMole = moleCard && card.getFileName() === moleCard.getFileName();
                    if (isMole && hideMoleCard) {
                        const moleElement = this.cardUIBuilder('/resources/cards/BACK.png', ['mole-card']);
                        this.dealerSide.appendChild(moleElement);
                    }
                    else {
                        const cardElement = this.cardUIBuilder(card.getFileName());
                        this.dealerSide.appendChild(cardElement);
                    }
                });
            }
        });
    }
    revealMoleCard(dealer) {
        const moleCardElement = this.dealerSide.querySelector('.mole-card');
        if (moleCardElement && dealer.getMoleCard()) {
            moleCardElement.src = dealer.getMoleCard().getFileName();
        }
        else {
            console.warn('No mole card found to reveal.');
        }
    }
    displayAddedCard(player) {
        const cards = player.getCards();
        const lastCard = cards[cards.length - 1];
        const cardElement = this.cardUIBuilder(lastCard.getFileName());
        if (player instanceof User) {
            this.userSide.appendChild(cardElement);
        }
        else if (player instanceof Dealer) {
            this.dealerSide.appendChild(cardElement);
        }
    }
}
