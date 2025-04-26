import { ComponentBuilder as CB } from './ComponentBuilder.js';
import Dealer from './Dealer.js';
import User from './User.js';
export default class WinnerUIHandler {
    constructor() {
        this.htmlBody = document.body;
        // pre-make the UI
        // pop up box container
        this.popUpBox = CB.containerBuilder(['pop-up-box', 'win-lose-div']);
        // buttons
        this.continueBtn = CB.buttonBuilder('continue', ['continue-btn']);
        this.restartBtn = CB.buttonBuilder('restart', ['restart-btn']);
        // div of buttons
        this.btnDiv = CB.containerBuilder(['winner-btns']);
    }
    async displayWinner(player) {
        // reset styles
        this.popUpBox.classList.remove('winner');
        this.popUpBox.classList.remove('loser');
        // set text and styles
        if (player == null) {
            this.popUpBox.innerText = 'Draw';
        }
        else if (player instanceof User) {
            this.popUpBox.innerText = 'You won!';
            this.popUpBox.classList.add('winner');
        }
        else if (player instanceof Dealer) {
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
    attachEventListener() {
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
