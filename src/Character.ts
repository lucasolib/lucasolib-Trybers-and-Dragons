import getRandomInt from './utils';
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifepoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._race = new Elf(this._name, this.dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = Math.floor(this._race.maxLifePoints / 2);
    this._lifepoints = this._maxLifePoints;
    this._energy = {
      type_: this.archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }
  
  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints(): number { return this._lifepoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy {
    const type = this._energy.type_;
    const { amount } = this._energy;
    return { type_: type, amount };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifepoints -= damage;
    } else {
      this._lifepoints -= 1;
    } if (this._lifepoints <= 0) {
      this._lifepoints = -1;
    } return this._lifepoints;
  }

  attack(enemy: Fighter): number {
    const attackPoints = this._strength;
    enemy.receiveDamage(attackPoints);
    return attackPoints;
  }

  levelUp() {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifepoints = this._maxLifePoints;
  }

  special(enemy: Fighter): void {
    const attackPoints = this._strength
    + this._dexterity + this._energy.amount / 2;
    this.energy.amount -= 1;
    enemy.receiveDamage(attackPoints);
  }
}