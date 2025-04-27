import Player from './Player.js';
export default class User extends Player {
    constructor(config) {
        super();
        this.money = config.getStartingMoney();
        this.bet = config.getMinBet();
    }
    getMoney() {
        return this.money;
    }
    setMoney(money) {
        this.money = money;
    }
    setBet(bet) {
        this.bet = bet;
    }
    getBet() {
        return this.bet;
    }
}
