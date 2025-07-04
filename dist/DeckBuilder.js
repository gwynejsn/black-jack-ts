import Card from './Card.js';
export default class DeckBuilder {
    constructor(config, tableUIHandler) {
        this.uniqueChecker = new Set();
        this.suits = ['H', 'D', 'S', 'C'];
        this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11 = J, 12 = K, 13 = Q, 14 = A
        this.config = config;
        this.tableUIHandler = tableUIHandler;
    }
    cleanDeck(players) {
        this.uniqueChecker.clear();
        this.tableUIHandler.clearTable();
        players.forEach((player) => player.removeAllCards());
    }
    distributeCards(players) {
        players.forEach((player) => {
            for (let i = 0; i < this.config.getStartingNoOfCards(); i++)
                player.addCard(this.generateCard());
        });
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
    addCard(player) {
        player.addCard(this.generateCard());
        this.tableUIHandler.displayAddedCard(player);
    }
}
