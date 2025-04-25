import Config from './config.js';

export default class UIHandler {
  // status ui
  private roundNo: HTMLHeadingElement;
  private playerMoney: HTMLHeadingElement;

  private config: Config;

  constructor(config: Config) {
    this.roundNo = document.querySelector('#round-no') as HTMLHeadingElement;
    this.playerMoney = document.querySelector(
      '#player-money'
    ) as HTMLHeadingElement;
    this.config = config;

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
