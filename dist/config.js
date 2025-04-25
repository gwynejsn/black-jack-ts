export default class Config {
    constructor() {
        this.startingMoney = 150;
        this.minBet = 10;
        this.startingNoOfCards = 2;
    }
    getStartingMoney() {
        return this.startingMoney;
    }
    getMinBet() {
        return this.minBet;
    }
    getStartingNoOfCards() {
        return this.startingNoOfCards;
    }
}
