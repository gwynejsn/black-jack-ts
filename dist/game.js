import Config from './config.js';
import UIHandler from './uiHandler.js';
import UserEvents from './userEvents.js';
export default class Game {
    constructor() {
        console.log('initializing game...');
        this.config = new Config();
        this.userEvents = new UserEvents(this);
        this.uiHandler = new UIHandler(this.config);
    }
    playerHit() { }
    playerStand() { }
    playerBet() { }
    getConfig() {
        return this.config;
    }
}
new Game();
