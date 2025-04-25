import Player from './Player.js';
export default class Dealer extends Player {
    constructor() {
        super();
        this.moleCard = null;
    }
    addCard(card) {
        if (super.getCards().length == 0)
            this.moleCard = card;
        super.addCard(card);
    }
    getMoleCard() {
        return this.moleCard;
    }
}
