export default class UserEvents {
    constructor(config, user, statusUIHandler, deckBuilder) {
        this.hitBtn = document.querySelector('.hit');
        this.hitBtn.disabled = true;
        this.standBtn = document.querySelector('.stand');
        this.standBtn.disabled = true;
        this.betBtn = document.querySelector('.submit-bet');
        this.betInput = document.querySelector('#bet');
        this.betInput.defaultValue = config.getMinBet() + '';
        this.user = user;
        this.statusUIHandler = statusUIHandler;
        this.deckBuilder = deckBuilder;
    }
    askAction() {
        return new Promise((resolve) => {
            this.hitBtn.addEventListener('click', () => this.deckBuilder.addCard(this.user));
            this.standBtn.addEventListener('click', () => resolve());
        });
    }
    askBet() {
        return new Promise((resolve) => {
            this.betInput.addEventListener('input', () => this.betValidator());
            this.betBtn.addEventListener('click', () => {
                this.setUserBet();
                resolve();
            });
        });
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
    setUserBet() {
        this.user.setMoney(this.user.getMoney() - Number(this.betInput.value));
        this.statusUIHandler.updateUserMoney();
        this.betBtn.disabled = true;
        this.hitBtn.disabled = false;
        this.standBtn.disabled = false;
    }
}
