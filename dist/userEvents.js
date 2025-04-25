export default class UserEvents {
    constructor(game, config) {
        this.hitBtn = document.querySelector('.hit');
        this.standBtn = document.querySelector('.stand');
        this.betBtn = document.querySelector('.submit-bet');
        this.betInput = document.querySelector('#bet');
        this.betInput.defaultValue = config.getMinBet() + '';
        this.game = game;
        this.buttonEvents();
    }
    buttonEvents() {
        this.hitBtn.addEventListener('click', this.game.playerHit);
        this.standBtn.addEventListener('click', this.game.playerStand);
        this.betBtn.addEventListener('click', this.game.playerBet);
        this.betInput.addEventListener('input', () => this.betValidator());
    }
    betValidator() {
        let bet;
        try {
            bet = Number(this.betInput.value);
            console.log(typeof bet);
            if (bet <= 0 || isNaN(bet))
                throw 'wrong input.';
            this.betInput.classList.remove('wrong-input');
            this.betBtn.disabled = false;
        }
        catch (err) {
            console.log(err);
            this.betInput.classList.add('wrong-input');
            this.betBtn.disabled = true;
        }
    }
}
