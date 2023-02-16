import Race from './Race';

class Halfling extends Race {
  private _lifePoints = 60;
  private static _instances = 0;

  get maxLifePoints(): number {
    return this._lifePoints;
  }

  static createdRacesInstances(): number {
    this._instances += 1;
    return this._instances;
  }
}

export default Halfling;