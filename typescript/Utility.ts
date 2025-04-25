import Player from './Player';

export default class Utility {
  static computeTotalPts(player: Player) {
    let sum = 0;
    player.getCards().forEach((card) => {
      const rank = card.getRank();
      if (rank == 14) {
        if (sum + 11 > 21) sum += 1;
        else sum += 11;
      } else if (rank > 10) {
        sum += 10;
      } else {
        sum += rank;
      }
    });
    return sum;
  }
}
