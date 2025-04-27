export default class UserEvents {
    constructor(config, user, statusUIHandler, deckBuilder) {
        this.hitHandler = () => { };
        this.standHandler = () => { };
        this.hitBtn = document.querySelector('.hit');
        this.standBtn = document.querySelector('.stand');
        this.disableActionBtns(true); // disable hit and stand in first start
        this.betBtn = document.querySelector('.submit-bet');
        this.betInput = document.querySelector('#bet');
        this.updateBetInputPlaceholder(config);
        this.user = user;
        this.statusUIHandler = statusUIHandler;
        this.deckBuilder = deckBuilder;
        this.config = config;
    }
    updateBetInputPlaceholder(config) {
        this.betInput.defaultValue = config.getMinBet() + '';
    }
    askAction() {
        return new Promise((resolve) => {
            // remove old listeners
            this.hitBtn.removeEventListener('click', this.hitHandler);
            this.standBtn.removeEventListener('click', this.standHandler);
            // define new handlers
            this.hitHandler = () => this.deckBuilder.addCard(this.user);
            this.standHandler = () => resolve();
            // add listeners
            this.hitBtn.addEventListener('click', this.hitHandler);
            this.standBtn.addEventListener('click', this.standHandler, {
                once: true,
            });
        });
    }
    askBet() {
        return new Promise((resolve) => {
            this.disableBetInput(false);
            this.disableBetBtn(false);
            this.disableActionBtns(true); // disable hit and stand
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
            if (bet < this.config.getMinBet())
                throw 'minimum bet not met.';
            if (bet > this.user.getMoney())
                throw 'not enough money.';
            if (bet <= 0 || isNaN(bet))
                throw 'wrong input.';
            this.betInput.classList.remove('wrong-input');
            this.disableBetBtn(false);
        }
        catch (err) {
            console.log(err);
            this.betInput.classList.add('wrong-input');
            this.disableBetBtn(true);
        }
    }
    setUserBet() {
        this.user.setBet(Number(this.betInput.value));
        this.user.setMoney(this.user.getMoney() - Number(this.betInput.value));
        this.statusUIHandler.updateUserMoney();
        this.disableBetInput(true);
        this.disableBetBtn(true);
        this.disableActionBtns(false);
    }
    disableActionBtns(to) {
        this.hitBtn.disabled = to;
        this.standBtn.disabled = to;
    }
    disableBetBtn(to) {
        this.betBtn.disabled = to;
    }
    disableBetInput(to) {
        this.betInput.disabled = to;
    }
}
