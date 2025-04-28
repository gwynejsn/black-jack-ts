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
    setConfig(startingMoney = 150, minBet = 10, startingNoOfCards = 2) {
        console.log('setting up: ' + startingMoney, +' ' + minBet);
        this.startingMoney = startingMoney;
        this.minBet = minBet;
        this.startingNoOfCards = startingNoOfCards;
    }
}
