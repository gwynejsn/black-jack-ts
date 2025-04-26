import { ComponentBuilder as CB } from './ComponentBuilder.js';
export default class MenuUIHandler {
    constructor(config) {
        this.htmlBody = document.body;
        const { mainMenu, startGameBtn, settingsBtn } = this.mainMenuBuilder();
        this.mainMenu = mainMenu;
        this.startGameBtn = startGameBtn;
        this.settingsBtn = settingsBtn;
        this.config = config;
    }
    initializeMainMenu() {
        return new Promise((resolve) => {
            this.toggleMainMenu(true);
            const startHandler = () => {
                this.startGameBtn.removeEventListener('click', startHandler);
                this.settingsBtn.removeEventListener('click', settingsHandler);
                this.toggleMainMenu(false);
                resolve();
            };
            const settingsHandler = async () => {
                this.startGameBtn.removeEventListener('click', startHandler);
                this.settingsBtn.removeEventListener('click', settingsHandler);
                await this.setupConfig(); // wait for settings to finish
                this.initializeMainMenu().then(resolve); // after settings, re-show menu and resolve eventually
            };
            this.startGameBtn.addEventListener('click', startHandler);
            this.settingsBtn.addEventListener('click', settingsHandler);
        });
    }
    setupConfig() {
        return new Promise((resolve) => {
            var _a, _b;
            this.mainMenu.appendChild(this.settingsBuilder());
            (_a = document
                .querySelector('.settings-undo-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                console.log('undo pressed');
                this.reRenderMainMenu();
                resolve();
            });
            (_b = document
                .querySelector('.settings-save-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const startingMoneyInput = document.querySelector('.starting-money-input');
                const minBetInput = document.querySelector('.min-bet-input');
                const startingNoOfCardsInput = document.querySelector('.starting-no-of-cards-input');
                const startingMoney = startingMoneyInput.value
                    ? Number(startingMoneyInput.value)
                    : undefined;
                const minBet = minBetInput.value
                    ? Number(minBetInput.value)
                    : undefined;
                const startingNoOfCards = startingNoOfCardsInput.value
                    ? Number(startingNoOfCardsInput.value)
                    : undefined;
                this.config.setConfig(startingMoney, minBet, startingNoOfCards);
                this.reRenderMainMenu();
                resolve();
            });
        });
    }
    reRenderMainMenu() {
        const mainMenuFound = document.querySelector('.main-menu');
        if (mainMenuFound) {
            // remove current
            this.htmlBody.removeChild(mainMenuFound);
            // re-render
            const { mainMenu, startGameBtn, settingsBtn } = this.mainMenuBuilder();
            this.mainMenu = mainMenu;
            this.startGameBtn = startGameBtn;
            this.settingsBtn = settingsBtn;
        }
    }
    settingsBuilder() {
        this.mainMenu.removeChild(document.querySelector('.main-menu-btns'));
        return CB.containerBuilder(['settings-input-div'], CB.inputBuilder(['starting-money-input'], 'starting money', '$150', 'settings-input-label'), CB.inputBuilder(['min-bet-input'], 'minimum bet', '$10', 'settings-input-label'), CB.inputBuilder(['starting-no-of-cards-input'], 'starting no. of cards', '2', 'settings-input-label'), CB.buttonBuilder('undo', ['settings-undo-btn']), CB.buttonBuilder('save', ['settings-save-btn']));
    }
    toggleMainMenu(show) {
        if (show)
            this.htmlBody.appendChild(this.mainMenu);
        else
            this.htmlBody.removeChild(document.querySelector('.main-menu'));
    }
    mainMenuBuilder() {
        const gameLogo = CB.headerBuilder('BlackJack', ['main-menu-logo']);
        const author = CB.headerBuilder('by gwyne deterala', ['main-menu-author'], 'h5');
        const titleDiv = CB.containerBuilder(['main-menu-title'], gameLogo, author);
        const startGameBtn = CB.buttonBuilder('start', ['start-btn']);
        const settingsBtn = CB.buttonBuilder('settings', ['settings-btn']);
        const btnsDiv = CB.containerBuilder(['main-menu-btns'], startGameBtn, settingsBtn);
        const mainMenu = CB.containerBuilder(['main-menu'], titleDiv, btnsDiv);
        return { mainMenu, startGameBtn, settingsBtn };
    }
}
