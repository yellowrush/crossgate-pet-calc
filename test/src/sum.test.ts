import { calPetBPsByAblities } from '../../src/calc';

describe('src/calc', () => {
  test('calPetBPsByAblities', () => {
    expect(calPetBPsByAblities({
      hps: 100,
      mps: 100,
      atk: 30,
      def: 30,
      agi: 30,
    }).valueOf()).toStrictEqual([5, 1, 1, 3, 4]);
  });
});