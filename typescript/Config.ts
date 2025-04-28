export default class Config {
  private startingMoney: number;
  private minBet: number;
  private startingNoOfCards: number;

  constructor() {
    this.startingMoney = 150;
    this.minBet = 10;
    this.startingNoOfCards = 2;
  }

  public getStartingMoney() {
    return this.startingMoney;
  }

  public getMinBet() {
    return this.minBet;
  }

  public getStartingNoOfCards() {
    return this.startingNoOfCards;
  }

  public setConfig(
    startingMoney: number = 150,
    minBet: number = 10,
    startingNoOfCards: number = 2
  ) {
    console.log('setting up: ' + startingMoney, +' ' + minBet);
    this.startingMoney = startingMoney;
    this.minBet = minBet;
    this.startingNoOfCards = startingNoOfCards;
  }
}
