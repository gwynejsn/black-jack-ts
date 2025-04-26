export default class StatusUIHandler {
    constructor(user, game) {
        this.roundNo = document.querySelector('#round-no');
        this.playerMoney = document.querySelector('#player-money');
        this.game = game;
        this.user = user;
        this.updateUserMoney();
    }
    updateRoundNo(roundNo) {
        this.roundNo.innerText = 'Round ' + roundNo;
    }
    updateUserMoney() {
        this.playerMoney.innerText = '$' + this.user.getMoney();
    }
}
