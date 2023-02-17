import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private player1: Fighter;
  private player2: Fighter;

  constructor(p1: Fighter, p2: Fighter) {
    super(p1);
    this.player1 = p1;
    this.player2 = p2;
  }

  private turns() {
    while (this.player1.lifePoints !== -1 && this.player2.lifePoints !== -1) {
      this.player1.attack(this.player2);
      this.player2.attack(this.player1);
    }
  }

  fight(): number {
    this.turns();
    return this.player1.lifePoints === -1 ? -1 : 1;
  }
}