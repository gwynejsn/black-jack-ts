export default class UIHandler {
    constructor(config) {
        this.roundNo = document.querySelector('#round-no');
        this.playerMoney = document.querySelector('#player-money');
        this.config = config;
        // initialize round and money
        this.changeRoundNo(1);
        this.changePlayerMoney(config.getStartingMoney());
    }
    changeRoundNo(roundNo) {
        this.roundNo.innerText = 'Round ' + roundNo;
    }
    changePlayerMoney(playerMoney) {
        this.playerMoney.innerText = '$' + playerMoney;
    }
}
