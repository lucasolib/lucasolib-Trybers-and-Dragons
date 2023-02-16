import Race from './Race';

class Dwarf extends Race {
  private _lifePoints = 80;
  private static _instances = 0;

  get maxLifePoints(): number {
    return this._lifePoints;
  }

  static createdRacesInstances(): number {
    this._instances += 1;
    return this._instances;
  }
}

export default Dwarf;