import Config from './Config.js';
import Player from './Player.js';

export default class User extends Player {
  private money: number;

  constructor(config: Config) {
    super();
    this.money = config.getStartingMoney();
  }

  public getMoney() {
    return this.money;
  }

  public setMoney(money: number) {
    this.money = money;
  }
}
