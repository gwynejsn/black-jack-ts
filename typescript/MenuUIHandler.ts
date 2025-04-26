import { ComponentBuilder as CB } from './ComponentBuilder.js';
import Config from './Config.js';
export default class MenuUIHandler {
  private htmlBody: HTMLBodyElement;
  private mainMenu: HTMLDivElement;
  private startGameBtn: HTMLButtonElement;
  private settingsBtn: HTMLButtonElement;

  private config: Config;

  constructor(config: Config) {
    this.htmlBody = document.body as HTMLBodyElement;
    const { mainMenu, startGameBtn, settingsBtn } = this.mainMenuBuilder();
    this.mainMenu = mainMenu;
    this.startGameBtn = startGameBtn;
    this.settingsBtn = settingsBtn;
    this.config = config;
  }

  public initializeMainMenu(): Promise<void> {
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

  private setupConfig(): Promise<void> {
    return new Promise((resolve) => {
      this.mainMenu.appendChild(this.settingsBuilder());

      document
        .querySelector('.settings-undo-btn')
        ?.addEventListener('click', () => {
          console.log('undo pressed');
          this.reRenderMainMenu();
          resolve();
        });

      document
        .querySelector('.settings-save-btn')
        ?.addEventListener('click', () => {
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

  private reRenderMainMenu() {
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

  private settingsBuilder() {
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
      CB.buttonBuilder('undo', ['settings-undo-btn']),
      CB.buttonBuilder('save', ['settings-save-btn'])
    );
  }

  public toggleMainMenu(show: boolean) {
    if (show) this.htmlBody.appendChild(this.mainMenu);
    else
      this.htmlBody.removeChild(
        document.querySelector('.main-menu') as HTMLDivElement
      );
  }

  private mainMenuBuilder(): {
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
}
