import { ComponentBuilder as CB } from './ComponentBuilder.js';
import Config from './Config.js';
import StatusUIHandler from './StatusUIHandler.js';
import User from './User.js';
import UserEvents from './UserEvents.js';

export default class MenuUIHandler {
  private htmlBody: HTMLBodyElement;
  private mainMenu: HTMLDivElement;
  private startGameBtn: HTMLButtonElement;
  private settingsBtn: HTMLButtonElement;
  private config: Config;
  private user: User;
  private statusUIHandler: StatusUIHandler;
  private userEvents: UserEvents;

  constructor(
    config: Config,
    user: User,
    statusUIHandler: StatusUIHandler,
    userEvents: UserEvents
  ) {
    this.htmlBody = document.body as HTMLBodyElement;
    const { mainMenu, startGameBtn, settingsBtn } = this.createMainMenu();
    this.mainMenu = mainMenu;
    this.startGameBtn = startGameBtn;
    this.settingsBtn = settingsBtn;
    this.config = config;
    this.user = user;
    this.statusUIHandler = statusUIHandler;
    this.userEvents = userEvents;
  }

  public initializeMainMenu(): Promise<void> {
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

  private removeEventListeners(
    startHandler: EventListener,
    settingsHandler: EventListener
  ) {
    this.startGameBtn.removeEventListener('click', startHandler);
    this.settingsBtn.removeEventListener('click', settingsHandler);
  }

  private setupConfig(): Promise<void> {
    return new Promise((resolve) => {
      this.mainMenu.appendChild(this.buildSettingsUI());

      document
        .querySelector('.settings-undo-btn')
        ?.addEventListener('click', () => {
          this.reRenderMainMenu();
          resolve();
        });

      document
        .querySelector('.settings-save-btn')
        ?.addEventListener('click', () => {
          this.saveSettings();
          this.reRenderMainMenu();
          resolve();
        });
    });
  }

  private saveSettings() {
    const startingMoneyInput = document.querySelector(
      '.starting-money-input'
    ) as HTMLInputElement;
    const minBetInput = document.querySelector(
      '.min-bet-input'
    ) as HTMLInputElement;
    const startingNoOfCardsInput = document.querySelector(
      '.starting-no-of-cards-input'
    ) as HTMLInputElement;

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

  private buildSettingsUI() {
    this.mainMenu.removeChild(
      document.querySelector('.main-menu-btns') as HTMLDivElement
    );
    return CB.containerBuilder(
      ['settings-input-div'],
      CB.inputBuilder(
        ['starting-money-input'],
        'starting money',
        '$150',
        'settings-input-label'
      ),
      CB.inputBuilder(
        ['min-bet-input'],
        'minimum bet',
        '$10',
        'settings-input-label'
      ),
      CB.inputBuilder(
        ['starting-no-of-cards-input'],
        'starting no. of cards',
        '2',
        'settings-input-label'
      ),
      CB.containerBuilder(
        ['settings-btns-div'],
        CB.buttonBuilder('undo', ['settings-undo-btn']),
        CB.buttonBuilder('save', ['settings-save-btn'])
      )
    );
  }

  private reRenderMainMenu() {
    const mainMenuFound = document.querySelector('.main-menu');
    if (mainMenuFound) {
      this.htmlBody.removeChild(mainMenuFound);
      const { mainMenu, startGameBtn, settingsBtn } = this.createMainMenu();
      this.mainMenu = mainMenu;
      this.startGameBtn = startGameBtn;
      this.settingsBtn = settingsBtn;
    }
  }

  private createMainMenu(): {
    mainMenu: HTMLDivElement;
    startGameBtn: HTMLButtonElement;
    settingsBtn: HTMLButtonElement;
  } {
    const gameLogo = CB.headerBuilder('BlackJack', ['main-menu-logo']);
    const author = CB.headerBuilder(
      'by gwyne deterala',
      ['main-menu-author'],
      'h5'
    );
    const titleDiv = CB.containerBuilder(['main-menu-title'], gameLogo, author);
    const startGameBtn = CB.buttonBuilder('start', ['start-btn']);
    const settingsBtn = CB.buttonBuilder('settings', ['settings-btn']);
    const btnsDiv = CB.containerBuilder(
      ['main-menu-btns'],
      startGameBtn,
      settingsBtn
    );
    const mainMenu = CB.containerBuilder(['main-menu'], titleDiv, btnsDiv);
    return { mainMenu, startGameBtn, settingsBtn };
  }

  public toggleMainMenu(show: boolean) {
    if (show) {
      this.htmlBody.appendChild(this.mainMenu);
    } else {
      this.htmlBody.removeChild(
        document.querySelector('.main-menu') as HTMLDivElement
      );
    }
  }
}
