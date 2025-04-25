import Player from './Player.js';
export default class User extends Player {
    constructor() {
        super();
        this.money = 150;
    }
    getMoney() {
        return this.money;
    }
}
