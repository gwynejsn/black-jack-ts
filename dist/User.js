import Player from './Player.js';
export default class User extends Player {
    constructor(config) {
        super();
        this.money = config.getStartingMoney();
    }
    getMoney() {
        return this.money;
    }
    setMoney(money) {
        this.money = money;
    }
}
