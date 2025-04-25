export default class Player {
  private money: number;

  constructor() {
    this.money = 150;
  }

  public getMoney() {
    return this.money;
  }
}
