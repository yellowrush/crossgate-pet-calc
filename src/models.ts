// Basic model definitions used across the project

/**
 * PetStats interface - observed stats for a pet at a given level
 */
export interface PetStats {
  lvl: number;
  hp: number;
  mp: number;
  attack: number;
  defend: number;
  agi: number;
}

/**
 * BP class - stores five-dimensional BP values and can produce observed stats
 */
export class BP {
  constructor(
    public readonly hp: number = 0,
    public readonly attack: number = 0,
    public readonly defend: number = 0,
    public readonly agi: number = 0,
    public readonly mp: number = 0
  ) {}

  toArray(): number[] {
    return [this.hp, this.attack, this.defend, this.agi, this.mp];
  }

  /**
   * Calculate the observed stats from BP. This implementation mirrors the
   * simple conversion used in the repo: hp * 30, others * 3. Keep 4 decimal places.
   */
  calcRealNum(lvl: number = 1): PetStats {
    const fix = (n: number) => Number(n.toFixed(4));
    return {
      lvl,
      hp: fix(this.hp * 30),
      mp: fix(this.mp * 3),
      attack: fix(this.attack * 3),
      defend: fix(this.defend * 3),
      agi: fix(this.agi * 3),
    };
  }
}
