import Player from './Player.js';

export default class Utility {
  static computeTotalPts(player: Player) {
    let sum = 0;
    let aceCount = 0;

    player.getCards().forEach((card) => {
      const rank = card.getRank();
      if (rank === 14) {
        // Ace
        aceCount++;
        sum += 11;
      } else if (rank > 10) {
        // Face cards (Jack, Queen, King)
        sum += 10;
      } else {
        // Numeric cards
        sum += rank;
      }
    });

    // Adjust for Aces if the sum is greater than 21
    while (sum > 21 && aceCount > 0) {
      sum -= 10; // Convert one Ace from 11 to 1
      aceCount--;
    }

    return sum;
  }
}
