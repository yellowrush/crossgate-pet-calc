import { PetStats, BP } from './models';

/**
 * PetStat - 表示一个宠物的已观测属性（等级 + 5维属性）
 *
 * 该类提供：
 * - 从 BP 构造 observed stats
 * - 将 observed stats 转换为估算的 BP
 * - 应用手动 BP 点数并刷新 observed stats
 * - 近似比较、序列化等工具方法
 */
export class PetStat implements PetStats {
  constructor(
    public lvl: number,
    public hp: number,
    public mp: number,
    public attack: number,
    public defend: number,
    public agi: number,
    public name?: string
  ) {}

  /**
   * 从一个普通对象构造 PetStat
   */
  static fromObject(obj: Partial<PetStats> & { name?: string }): PetStat {
    return new PetStat(
      obj.lvl ?? 1,
      obj.hp ?? 0,
      obj.mp ?? 0,
      obj.attack ?? 0,
      obj.defend ?? 0,
      obj.agi ?? 0,
      obj.name
    );
  }

  /**
   * 根据 BP 生成 PetStat（使用 BP.calcRealNum）
   */
  static fromBP(bp: BP, lvl: number = 1, name?: string): PetStat {
    const s = bp.calcRealNum(lvl);
    return new PetStat(lvl, s.hp, s.mp, s.attack, s.defend, s.agi, name);
  }

  /**
   * 将当前 observed stats 估算回 BP（反向近似运算）
   * 注意：这是个简单线性近似：hp->hp/30, others->value/3
   * 返回 BP 可能包含小数
   */
  toBP(): BP {
    const hpBP = this.hp / 30;
    const mpBP = this.mp / 3;
    const atkBP = this.attack / 3;
    const defBP = this.defend / 3;
    const agiBP = this.agi / 3;

    // BP 构造顺序：hp, attack, defend, agi, mp
    return new BP(hpBP, atkBP, defBP, agiBP, mpBP);
  }

  /**
   * 应用手动分配的 BP 点数（数组顺序：[hp, attack, defend, agi, mp]），并刷新 observed stats
   * 该方法会把这些点数加到当前估算的 BP 上，然后重新计算 observed stats（使用当前 lvl）
   */
  applyManualBPPoints(points: number[]): void {
    const curBP = this.toBP();
    const [hpAdd = 0, atkAdd = 0, defAdd = 0, agiAdd = 0, mpAdd = 0] = points;
    const newBP = new BP(
      curBP.hp + hpAdd,
      curBP.attack + atkAdd,
      curBP.defend + defAdd,
      curBP.agi + agiAdd,
      curBP.mp + mpAdd
    );

    const newStats = newBP.calcRealNum(this.lvl);
    this.hp = newStats.hp;
    this.mp = newStats.mp;
    this.attack = newStats.attack;
    this.defend = newStats.defend;
    this.agi = newStats.agi;
  }

  /**
   * 返回当前 BP 估算和 observed stats 的快照对象
   */
  toJSON() {
    return {
      name: this.name,
      lvl: this.lvl,
      hp: this.hp,
      mp: this.mp,
      attack: this.attack,
      defend: this.defend,
      agi: this.agi,
      bp: this.toBP().toArray(),
    };
  }

  /**
   * 近似比较：使用相对误差阈值判断两个 PetStats 是否接近
   * @param other 要比较的对象
   * @param relTol 相对误差容差（默认1%）
   */
  approxEqual(other: PetStats, relTol = 0.01): boolean {
    const rel = (a: number, b: number) =>
      b === 0 ? Math.abs(a - b) : Math.abs((a - b) / b);
    return (
      rel(this.hp, other.hp) <= relTol &&
      rel(this.mp, other.mp) <= relTol &&
      rel(this.attack, other.attack) <= relTol &&
      rel(this.defend, other.defend) <= relTol &&
      rel(this.agi, other.agi) <= relTol
    );
  }

  /**
   * 复制一份 PetStat
   */
  clone(): PetStat {
    return new PetStat(
      this.lvl,
      this.hp,
      this.mp,
      this.attack,
      this.defend,
      this.agi,
      this.name
    );
  }
}
