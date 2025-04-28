import { ComponentBuilder as CB } from './ComponentBuilder.js';
export default class MenuUIHandler {
    constructor(config, user, statusUIHandler, userEvents) {
        this.htmlBody = document.body;
        const { mainMenu, startGameBtn, settingsBtn } = this.createMainMenu();
        this.mainMenu = mainMenu;
        this.startGameBtn = startGameBtn;
        this.settingsBtn = settingsBtn;
        this.config = config;
        this.user = user;
        this.statusUIHandler = statusUIHandler;
        this.userEvents = userEvents;
        this.restartBtn = CB.buttonBuilder('restart', ['restart-btn']);
    }
    initializeMainMenu() {
        return new Promise((resolve) => {
            this.toggleMainMenu(true);
            const startHandler = () => {
                this.removeEventListeners(startHandler, settingsHandler);
                this.toggleMainMenu(false);
                resolve();
            };
            const settingsHandler = async () => {
                this.removeEventListeners(startHandler, settingsHandler);
                await this.setupConfig();
                this.initializeMainMenu().then(resolve);
            };
            this.startGameBtn.addEventListener('click', startHandler);
            this.settingsBtn.addEventListener('click', settingsHandler);
        });
    }
    removeEventListeners(startHandler, settingsHandler) {
        this.startGameBtn.removeEventListener('click', startHandler);
        this.settingsBtn.removeEventListener('click', settingsHandler);
    }
    setupConfig() {
        return new Promise((resolve) => {
            var _a, _b;
            this.mainMenu.appendChild(this.buildSettingsUI());
            (_a = document
                .querySelector('.settings-undo-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.reRenderMainMenu();
                resolve();
            });
            (_b = document
                .querySelector('.settings-save-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.saveSettings();
                this.reRenderMainMenu();
                resolve();
            });
        });
    }
    saveSettings() {
        const startingMoneyInput = document.querySelector('.starting-money-input');
        const minBetInput = document.querySelector('.min-bet-input');
        const startingNoOfCardsInput = document.querySelector('.starting-no-of-cards-input');
        const startingMoney = startingMoneyInput.value
            ? Number(startingMoneyInput.value)
            : undefined;
        const minBet = minBetInput.value ? Number(minBetInput.value) : undefined;
        const startingNoOfCards = startingNoOfCardsInput.value
            ? Number(startingNoOfCardsInput.value)
            : undefined;
        this.config.setConfig(startingMoney, minBet, startingNoOfCards);
        this.user.setMoney(this.config.getStartingMoney());
        this.statusUIHandler.updateUserMoney(); // update based on config
        this.userEvents.updateBetInputPlaceholder();
    }
    buildSettingsUI() {
        this.mainMenu.removeChild(document.querySelector('.main-menu-btns'));
        return CB.containerBuilder(['settings-input-div'], CB.inputBuilder(['starting-money-input'], 'starting money', '$150', 'settings-input-label'), CB.inputBuilder(['min-bet-input'], 'minimum bet', '$10', 'settings-input-label'), CB.inputBuilder(['starting-no-of-cards-input'], 'starting no. of cards', '2', 'settings-input-label'), CB.containerBuilder(['settings-btns-div'], CB.buttonBuilder('undo', ['settings-undo-btn']), CB.buttonBuilder('save', ['settings-save-btn'])));
    }
    reRenderMainMenu() {
        const mainMenuFound = document.querySelector('.main-menu');
        if (mainMenuFound) {
            this.htmlBody.removeChild(mainMenuFound);
            const { mainMenu, startGameBtn, settingsBtn } = this.createMainMenu();
            this.mainMenu = mainMenu;
            this.startGameBtn = startGameBtn;
            this.settingsBtn = settingsBtn;
        }
    }
    createMainMenu() {
        const gameLogo = CB.headerBuilder('BlackJack', ['main-menu-logo']);
        const author = CB.headerBuilder('by gwyne deterala', ['main-menu-author'], 'h5');
        const titleDiv = CB.containerBuilder(['main-menu-title'], gameLogo, author);
        const startGameBtn = CB.buttonBuilder('start', ['start-btn']);
        const settingsBtn = CB.buttonBuilder('settings', ['settings-btn']);
        const btnsDiv = CB.containerBuilder(['main-menu-btns'], startGameBtn, settingsBtn);
        const mainMenu = CB.containerBuilder(['main-menu'], titleDiv, btnsDiv);
        return { mainMenu, startGameBtn, settingsBtn };
    }
    toggleMainMenu(show) {
        if (show) {
            this.htmlBody.appendChild(this.mainMenu);
        }
        else {
            this.htmlBody.removeChild(document.querySelector('.main-menu'));
        }
    }
    askToRestart() {
        const popUpBox = CB.containerBuilder(['restart-pop-up-box', 'pop-up-box'], CB.headerBuilder('Your ran out of money.', ['restart-heading'], 'h2'), this.restartBtn);
        this.restartBtn.addEventListener('click', () => {
            console.log('restart clicked');
            window.location.reload();
        });
        this.htmlBody.appendChild(popUpBox);
    }
}
