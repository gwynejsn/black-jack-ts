export default class Config {
  private startingMoney: number;
  private minBet: number;

  constructor() {
    this.startingMoney = 150;
    this.minBet = 10;
  }

  public getStartingMoney() {
    return this.startingMoney;
  }

  public getMinBet() {
    return this.minBet;
  }
}
