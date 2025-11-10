import { PetStat } from '../../src/petStat';
// use require to avoid TypeScript module resolution issues in test env
const { BP } = require('../../src/models');

describe('PetStat class', () => {
  test('fromObject and toJSON preserve fields', () => {
    const obj = {
      lvl: 5,
      hp: 150,
      mp: 45,
      attack: 60,
      defend: 30,
      agi: 20,
      name: 'Test',
    };
    const p = PetStat.fromObject(obj);
    expect(p.lvl).toBe(5);
    expect(p.hp).toBe(150);
    expect(p.mp).toBe(45);
    expect(p.attack).toBe(60);
    expect(p.defend).toBe(30);
    expect(p.agi).toBe(20);
    expect(p.name).toBe('Test');

    const json = p.toJSON();
    expect(json.name).toBe('Test');
    expect(json.lvl).toBe(5);
    expect(json.bp).toBeDefined();
    expect(Array.isArray(json.bp)).toBeTruthy();
  });

  test('toBP produces expected BP values (inverse of calcRealNum)', () => {
    // choose values so inverse is integral: hp=300 -> hpBP=10, others=30 -> 10
    const p = new PetStat(1, 300, 30, 30, 30, 30);
    const bp = p.toBP();
    expect(bp.hp).toBeCloseTo(10, 6);
    expect(bp.attack).toBeCloseTo(10, 6);
    expect(bp.defend).toBeCloseTo(10, 6);
    expect(bp.agi).toBeCloseTo(10, 6);
    expect(bp.mp).toBeCloseTo(10, 6);
  });

  test('fromBP -> toBP roundtrip (within tolerance)', () => {
    const original = new BP(7.1234, 36.5, 38.25, 34.75, 11.125);
    const p = PetStat.fromBP(original, 1);
    const round = p.toBP();

    // roundtrip should be close to original within reasonable tolerance
    expect(round.hp).toBeCloseTo(original.hp, 3);
    expect(round.attack).toBeCloseTo(original.attack, 3);
    expect(round.defend).toBeCloseTo(original.defend, 3);
    expect(round.agi).toBeCloseTo(original.agi, 3);
    expect(round.mp).toBeCloseTo(original.mp, 3);
  });

  test('applyManualBPPoints updates observed stats accordingly', () => {
    const base = new BP(5, 5, 5, 5, 5);
    const p = PetStat.fromBP(base, 10);

    // compute current BP
    const beforeBP = p.toBP();

    // apply manual points
    p.applyManualBPPoints([1.5, 2, 0.5, 0, 3]);

    const afterBP = p.toBP();
    expect(afterBP.hp).toBeCloseTo(beforeBP.hp + 1.5, 6);
    expect(afterBP.attack).toBeCloseTo(beforeBP.attack + 2, 6);
    expect(afterBP.defend).toBeCloseTo(beforeBP.defend + 0.5, 6);
    expect(afterBP.agi).toBeCloseTo(beforeBP.agi + 0, 6);
    expect(afterBP.mp).toBeCloseTo(beforeBP.mp + 3, 6);
  });

  test('approxEqual recognizes near-equal stats', () => {
    const a = new PetStat(50, 3000, 500, 400, 300, 200);
    const b = new PetStat(50, 3010, 502, 396, 303, 198);

    // relative differences are small -> approxEqual true
    expect(a.approxEqual(b, 0.02)).toBeTruthy();

    // large difference -> false
    const c = new PetStat(50, 5000, 700, 700, 600, 400);
    expect(a.approxEqual(c, 0.02)).toBeFalsy();
  });
});
