import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  private player1: Fighter;
  private monsters: SimpleFighter[];

  constructor(p1: Fighter, monster: SimpleFighter[]) {
    super(p1);
    this.player1 = p1;
    this.monsters = monster;
  }

  private turns() {
    this.monsters.forEach((monster) => {
      while (this.player1.lifePoints !== -1 && monster.lifePoints !== -1) {
        this.player1.attack(monster);
        monster.attack(this.player1);
      }
      if (monster.lifePoints < 0) {
        const index = this.monsters.indexOf(monster);
        this.monsters.splice(index, 1);
      }
    });
  }

  fight(): number {
    this.turns();
    if (this.monsters.length === 0) {
      return 1;
    } return this.player1.lifePoints === -1 ? -1 : 1;
  }
}