import Card from './card.js';
export default class DeckBuilder {
    constructor() {
        this.suits = ['H', 'D', 'S', 'C'];
        this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
        this.uniqueChecker = new Set();
        console.log('deck builder');
        this.userSide = document.querySelector('.player');
        this.userSide.appendChild(this.cardUIBuilder());
    }
    cardUIBuilder() {
        const cardUI = document.createElement('div');
        const cardImg = document.createElement('img');
        cardImg.src = this.generateCard().getFileName();
        cardUI.classList.add('card');
        cardUI.appendChild(cardImg);
        return cardUI;
    }
    generateCard() {
        let randomCard;
        do {
            randomCard = new Card(this.suits[this.randomNo(this.suits.length)], this.ranks[this.randomNo(this.ranks.length)]);
        } while (this.uniqueChecker.has(randomCard.getFileName()));
        this.uniqueChecker.add(randomCard.getFileName());
        return randomCard;
    }
    randomNo(length) {
        return Math.floor(Math.random() * length);
    }
}
