import { calPetBPsByAblities } from '../../src/calc';

test('calPetBPsByAblities', () => {
  expect(calPetBPsByAblities({
    hps: 100,
    mps: 100,
    atk: 30,
    def: 30,
    agi: 30,
  }).valueOf()).toEqual([[]]);
});