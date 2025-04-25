export default class Player {
    constructor() {
        this.cards = [];
    }
    getCards() {
        return this.cards;
    }
    addCard(card) {
        this.cards.push(card);
    }
}
