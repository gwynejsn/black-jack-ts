import Dealer from './Dealer.js';
import Player from './Player.js';
import User from './User.js';

export default class WinnerUIHandler {
  private htmlBody: HTMLBodyElement;
  private popUpBox: HTMLDivElement;
  private continueBtn: HTMLButtonElement;
  private restartBtn: HTMLButtonElement;
  private btnDiv: HTMLDivElement;

  constructor() {
    this.htmlBody = document.body as HTMLBodyElement;

    // pre-make the UI
    // pop up box container
    this.popUpBox = document.createElement('div');
    this.popUpBox.classList.add('pop-up-box');
    this.popUpBox.classList.add('win-lose-div');

    // buttons
    this.continueBtn = document.createElement('button');
    this.restartBtn = document.createElement('button');
    this.continueBtn.textContent = 'continue';
    this.continueBtn.classList.add('btn');
    this.continueBtn.classList.add('continue-btn');
    this.restartBtn.textContent = 'restart game';
    this.restartBtn.classList.add('btn');
    this.restartBtn.classList.add('restart-btn');

    // div of buttons
    this.btnDiv = document.createElement('div');
    this.btnDiv.classList.add('winner-btns');
  }

  public async displayWinner(player: Player | null): Promise<void> {
    // reset styles
    this.popUpBox.classList.remove('winner');
    this.popUpBox.classList.remove('loser');

    // set text and styles
    if (player == null) {
      this.popUpBox.innerText = 'Draw';
    } else if (player instanceof User) {
      this.popUpBox.innerText = 'You won!';
      this.popUpBox.classList.add('winner');
    } else if (player instanceof Dealer) {
      this.popUpBox.innerText = 'You lost.';
      this.popUpBox.classList.add('loser');
    }

    // append the UI
    this.btnDiv.appendChild(this.restartBtn);
    this.btnDiv.appendChild(this.continueBtn);
    this.popUpBox.appendChild(this.btnDiv);
    this.htmlBody.appendChild(this.popUpBox);

    await this.attachEventListener();
  }

  private attachEventListener(): Promise<void> {
    return new Promise((resolve) => {
      this.restartBtn.addEventListener('click', () => {
        window.location.reload();
      });
      this.continueBtn.addEventListener('click', () => {
        if (this.htmlBody.contains(this.popUpBox)) {
          this.htmlBody.removeChild(this.popUpBox);
        }
        resolve();
      });
    });
  }
}
