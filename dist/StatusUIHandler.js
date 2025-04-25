export default class StatusUIHandler {
    constructor(user, game) {
        this.roundNo = document.querySelector('#round-no');
        this.playerMoney = document.querySelector('#player-money');
        this.game = game;
        this.user = user;
        // initialize round and money
        this.updateRoundNo();
        this.updateUserMoney();
    }
    updateRoundNo() {
        this.roundNo.innerText = 'Round ' + this.game.getRoundNo();
    }
    updateUserMoney() {
        this.playerMoney.innerText = '$' + this.user.getMoney();
    }
}
