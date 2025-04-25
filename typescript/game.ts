import Config from './config.js';
import UIHandler from './uiHandler.js';
import UserEvents from './userEvents.js';

export default class Game {
  private userEvents: UserEvents;
  private uiHandler: UIHandler;
  private config: Config;

  constructor() {
    console.log('initializing game...');
    this.config = new Config();
    this.userEvents = new UserEvents(this);
    this.uiHandler = new UIHandler(this.config);
  }

  public playerHit() {}
  public playerStand() {}
  public playerBet() {}
  public getConfig() {
    return this.config;
  }
}

new Game();
