export default class UserEvents {
    constructor(config, user, statusUIHandler, deckBuilder) {
        this.onBetButtonClick = () => {
            var _a;
            if (this.betBtn.disabled)
                return; // prevent clicks when disabled
            this.setUserBet();
            (_a = this.resolveBet) === null || _a === void 0 ? void 0 : _a.call(this); // manually resolve
            this.cleanupBetListeners(); // clean bet listeners after bet is placed
        };
        this.betValidator = () => {
            let bet;
            try {
                bet = Number(this.betInput.value);
                if (bet < this.config.getMinBet())
                    throw new Error('Minimum bet not met.');
                if (bet > this.user.getMoney())
                    throw new Error('Not enough money.');
                if (bet <= 0 || isNaN(bet))
                    throw new Error('Invalid bet input.');
                this.betInput.classList.remove('wrong-input');
                this.toggleBetBtn(false);
            }
            catch (err) {
                console.error(err);
                this.betInput.classList.add('wrong-input');
                this.toggleBetBtn(true);
            }
        };
        // Event handlers
        this.hitHandler = () => { };
        this.standHandler = () => { };
        this.hitBtn = document.querySelector('.hit');
        this.standBtn = document.querySelector('.stand');
        this.betBtn = document.querySelector('.submit-bet');
        this.betInput = document.querySelector('#bet');
        this.user = user;
        this.statusUIHandler = statusUIHandler;
        this.deckBuilder = deckBuilder;
        this.config = config;
        this.initialize();
        // Set up bet button only once
        this.betBtn.addEventListener('click', this.onBetButtonClick);
    }
    initialize() {
        this.toggleActionBtns(true);
        this.updateBetInputPlaceholder();
    }
    updateBetInputPlaceholder() {
        this.betInput.defaultValue = this.config.getMinBet().toString();
    }
    askAction() {
        return new Promise((resolve) => {
            this.cleanupActionListeners(); // Always clean first
            this.resolveAction = resolve;
            this.hitHandler = this.handleHit.bind(this);
            this.standHandler = this.handleStand.bind(this);
            this.hitBtn.addEventListener('click', this.hitHandler);
            this.standBtn.addEventListener('click', this.standHandler);
        });
    }
    askBet() {
        return new Promise((resolve) => {
            this.cleanupBetListeners(); // Always clean first
            this.resolveBet = resolve;
            this.toggleActionBtns(true);
            this.toggleBetBtn(false);
            this.toggleBetInput(false);
            this.betInput.addEventListener('input', this.betValidator);
        });
    }
    handleHit() {
        this.deckBuilder.addCard(this.user);
    }
    handleStand() {
        var _a;
        (_a = this.resolveAction) === null || _a === void 0 ? void 0 : _a.call(this);
        this.cleanupActionListeners(); // Clean up after standing
    }
    setUserBet() {
        const betAmount = Number(this.betInput.value);
        this.user.setBet(betAmount);
        console.log('curr money ' + this.user.getMoney());
        const newMoney = this.user.getMoney() - betAmount;
        this.user.setMoney(newMoney);
        console.log('user mon ' + this.user.getMoney());
        this.statusUIHandler.updateUserMoney();
        this.toggleActionBtns(false);
        this.toggleBetInput(true);
        this.toggleBetBtn(true);
    }
    toggleBetBtn(disable) {
        this.betBtn.disabled = disable;
    }
    toggleActionBtns(disable) {
        this.hitBtn.disabled = disable;
        this.standBtn.disabled = disable;
    }
    toggleBetInput(disable) {
        this.betInput.disabled = disable;
    }
    // --- CLEANUP FUNCTIONS ---
    cleanupActionListeners() {
        this.hitBtn.removeEventListener('click', this.hitHandler);
        this.standBtn.removeEventListener('click', this.standHandler);
    }
    cleanupBetListeners() {
        this.betInput.removeEventListener('input', this.betValidator);
    }
}
