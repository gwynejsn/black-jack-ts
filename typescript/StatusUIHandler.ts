import Config from './Config';

export default class StatusUIHandler {
  private roundNo: HTMLHeadingElement;
  private playerMoney: HTMLHeadingElement;

  constructor(config: Config) {
    this.roundNo = document.querySelector('#round-no') as HTMLHeadingElement;
    this.playerMoney = document.querySelector(
      '#player-money'
    ) as HTMLHeadingElement;

    // initialize round and money
    this.changeRoundNo(1);
    this.changePlayerMoney(config.getStartingMoney());
  }

  public changeRoundNo(roundNo: number) {
    this.roundNo.innerText = 'Round ' + roundNo;
  }

  public changePlayerMoney(playerMoney: number) {
    this.playerMoney.innerText = '$' + playerMoney;
  }
}
