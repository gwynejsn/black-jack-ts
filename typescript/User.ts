import Player from './Player.js';

export default class User extends Player {
  private money: number;

  constructor() {
    super();
    this.money = 150;
  }

  public getMoney() {
    return this.money;
  }
}
