export default class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    getSuit() {
        return this.suit;
    }
    getRank() {
        return this.rank;
    }
    getFileName() {
        return '/resources/cards/' + this.rank + '-' + this.suit + '.png';
    }
}
