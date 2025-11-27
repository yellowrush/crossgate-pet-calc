'use strict';

import { RealGuess, GuessResultToString } from '../src/petStat';
import { petsData } from '../src/petsData';

describe('app.all()', () => {
  it('纯白液态史莱姆 59 1815 701 280 189 140 13', () => {
    var testcase = '纯白液态史莱姆 59 1815 701 280 189 140 13';
    console.log('輸入資料:' + testcase);
    const token = testcase.split(/ /).filter((n) => n != '');

    const params: number[] = token.slice(1).map((n) => parseInt(n, 10));
    const lvl = params.length === 5 ? 1 : params[0];
    const [hp, mp, attack, def, agi, notorderpoint] =
      params.length === 5 ? [0, ...params] : params; // lvl 已从 params[0] 取出
    const targetGrow = undefined;
    const results = RealGuess(
      petsData,
      token[0],
      lvl,
      hp,
      mp,
      attack,
      def,
      agi,
      notorderpoint,
      targetGrow
    );
    const limit = 10;
    const showDetails = 100;

    console.log(GuessResultToString(results, limit, showDetails));

    // 目前示例数据中没有这个宠物，断言为查无此宠物
    expect(results.pet.find).toBe(false);
  });
  it('圣诞水蓝鼠 98 2308 1327 935 328 281', () => {
    var testcase = '圣诞水蓝鼠 98 2308 1327 935 328 281';
    var token = testcase.split(/ +/);
    const nums: number[] = token.slice(1).map((n) => parseInt(n, 10));
    const [lvl, hp, mp, attack, def, agi] = nums;
    const notorderpoint = undefined;
    const targetGrow = undefined;
    const results = RealGuess(
      petsData,
      token[0],
      lvl,
      hp,
      mp,
      attack,
      def,
      agi,
      notorderpoint,
      targetGrow
    );
    const limit = 10;
    const showDetails = 100;

    console.log(GuessResultToString(results, limit, showDetails));
    expect(results.pet.name).toBe('圣诞水蓝鼠');
  });

  it('红色口臭鬼 1 122 102 36 33 28', () => {
    var testcase = '红色口臭鬼 1 122 102 36 33 28';
    var token = testcase.split(/ +/);
    const nums: number[] = token.slice(1).map((n) => parseInt(n, 10));
    const [lvl, hp, mp, attack, def, agi] = nums;
    const notorderpoint = undefined;
    const targetGrow = undefined;
    const results = RealGuess(
      petsData,
      token[0],
      lvl,
      hp,
      mp,
      attack,
      def,
      agi,
      notorderpoint,
      targetGrow
    );
    const limit = 10;
    const showDetails = 100;

    console.log(GuessResultToString(results, limit, showDetails));
    expect(results.pet.name).toBe('红色口臭鬼');
  });
});
