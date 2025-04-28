import Game from './Game.js';
import User from './User.js';

export default class StatusUIHandler {
  private roundNo: HTMLHeadingElement;
  private playerMoney: HTMLHeadingElement;

  private user: User;
  private game: Game;

  constructor(user: User, game: Game) {
    this.roundNo = document.querySelector('#round-no') as HTMLHeadingElement;
    this.playerMoney = document.querySelector(
      '#player-money'
    ) as HTMLHeadingElement;
    this.game = game;

    this.user = user;

    this.updateUserMoney();
  }

  public updateRoundNo(roundNo: number) {
    this.roundNo.innerText = 'Round ' + roundNo;
  }

  public updateUserMoney() {
    this.playerMoney.innerText = '$' + this.user.getMoney();
  }
}
