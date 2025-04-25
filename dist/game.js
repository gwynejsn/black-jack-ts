import Config from './config.js';
import DeckBuilder from './deckBuilder.js';
import Player from './player.js';
import UIHandler from './uiHandler.js';
import UserEvents from './userEvents.js';
export default class Game {
    constructor() {
        console.log('initializing game...');
        this.config = new Config();
        this.userEvents = new UserEvents(this);
        this.uiHandler = new UIHandler(this.config);
        this.deckBuilder = new DeckBuilder();
        this.player = new Player();
    }
    playerHit() { }
    playerStand() { }
    playerBet() { }
    getConfig() {
        return this.config;
    }
    startGame() {
        // while (this.player.getMoney() >= this.config.getMinBet()) {}
    }
}
new Game();
