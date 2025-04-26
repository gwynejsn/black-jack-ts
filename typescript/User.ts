import Config from './Config.js';
import Player from './Player.js';

export default class User extends Player {
  private money: number;
  private bet: number;

  constructor(config: Config) {
    super();
    this.money = config.getStartingMoney();
    this.bet = config.getMinBet();
  }

  public getMoney() {
    return this.money;
  }

  public setMoney(money: number) {
    this.money = money;
  }

  public setBet(bet: number) {
    this.bet = bet;
  }

  public getBet() {
    return this.bet;
  }
}
