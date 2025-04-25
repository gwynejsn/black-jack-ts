import Config from './config.js';
import DeckBuilder from './deckBuilder.js';
import Player from './player.js';
import UIHandler from './uiHandler.js';
import UserEvents from './userEvents.js';

export default class Game {
  private userEvents: UserEvents;
  private uiHandler: UIHandler;
  private config: Config;
  private deckBuilder: DeckBuilder;

  private player: Player;

  constructor() {
    console.log('initializing game...');
    this.config = new Config();
    this.userEvents = new UserEvents(this);
    this.uiHandler = new UIHandler(this.config);
    this.deckBuilder = new DeckBuilder();
    this.player = new Player();
  }

  public playerHit() {}
  public playerStand() {}
  public playerBet() {}
  public getConfig() {
    return this.config;
  }

  private startGame() {
    // while (this.player.getMoney() >= this.config.getMinBet()) {}
  }
}

new Game();
