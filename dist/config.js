export default class Config {
    constructor() {
        this.startingMoney = 150;
        this.minBet = 10;
    }
    getStartingMoney() {
        return this.startingMoney;
    }
    getMinBet() {
        return this.minBet;
    }
}
