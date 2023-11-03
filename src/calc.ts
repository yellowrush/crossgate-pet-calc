import { matrix, lusolve } from 'mathjs';

interface PetAbility {
  hps: number;
  mps: number;
  atk: number;
  def: number;
  agi: number;
  spr?: number;
  rec?: number;
}

//       生命 魔力 攻擊  防禦   敏捷   精神   回復
// +體力   8   1   0.2  0.2    0.1   -0.3   0.8
// +力量   2   2   2.7  0.3    0.2   -0.1  -0.1
// +強度   3   2   0.3  3      0.2    0.2  -0.1
// +速度   3   2   0.3  0.3    2     -0.1   0.2
// +魔法   1  10   0.2  0.2    0.1    0.8  -0.3

const BP_GROWS_MATRIX_ARRAYS = [
  [8, 2, 3 ,3, 1],
  [1, 2, 2, 2, 10],
  [0.2, 2.7, 0.3, 0.3, 0.2],
  [0.2, 0.3, 3, 0.3, 0.2],
  [0.1, 0.2, 0.2, 2, 0.1],
];

// 血魔攻防敏各有20點的基本值, 精神跟回復基本值為100點。
const ABILITY_BASE = 20;

export function calPetBPsByAblities(petAbility: PetAbility, bpRate: number = 1.2) {
  // BP内增加寵物成長比率
  const xyArrays = BP_GROWS_MATRIX_ARRAYS.map(arr => arr.map(grow => grow * bpRate));
  
  const zArrays = [
    petAbility.hps,
    petAbility.mps,
    petAbility.atk,
    petAbility.def,
    petAbility.agi,
  ].map((abs => abs - ABILITY_BASE));

  const solution = lusolve(matrix(xyArrays), matrix(zArrays));
  console.log("解：", solution);
  return solution;
}