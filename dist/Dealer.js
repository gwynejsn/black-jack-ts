import Player from './Player.js';
import Utility from './Utility.js';
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
    askAction(deckBuilder) {
        return new Promise((resolve) => {
            while (true) {
                if (!this.shouldDealerHit())
                    break;
                deckBuilder.addCard(this);
            }
            resolve();
        });
    }
    shouldDealerHit() {
        const currPts = Utility.computeTotalPts(this);
        return currPts < 17;
    }
}
