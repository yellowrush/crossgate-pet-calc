import { sum, calcDiff, minmax, GuessResultToString } from './utils';
declare class Stat {
    lvl: number;
    hp: number;
    mp: number;
    attack: number;
    defend: number;
    agi: number;
    constructor(lvl: any, hp: any, mp: any, attack: any, defend: any, agi: any);
    guessGrow(growRange: any, rate: any): Stat;
    toBP(): BP;
    str(): string;
    equal(stat: any): boolean;
    toArray(): number[];
    same(stat: any, tolerance?: number): boolean;
}
declare class BP {
    hpp: number;
    mpp: number;
    attackp: number;
    defendp: number;
    agip: number;
    constructor(hp: any, attack: any, defend: any, agi: any, mp: any);
    calcHP(): number;
    calcMP(): number;
    toArray(): number[];
    calcATK(): number;
    calcDEF(): number;
    calcAGI(): number;
    calcWIS(): number;
    calcRes(): number;
    contains(anotherBP: any): boolean;
    sum(): number;
    calcRealNum(): Stat;
    str(): string;
}
declare class GrowRange {
    hpp: number;
    mpp: number;
    attackp: number;
    defendp: number;
    agip: number;
    bprate: number;
    constructor(hp: number, attack: number, defend: number, agi: number, mp: number, bprate?: number);
    contains(anotherGrow: any): boolean;
    drop(hpp: any, atkp: any, defp: any, agip: any, mpp: any): GrowRange;
    same(agw: any): boolean;
    toArray(): number[];
    sum(): number;
    calcBPAtLevel(lvl: any, lvlpoint: any): {
        baseBP: BP;
        sumBaseBP: number;
        sumFullBP: any;
    };
    mockLoopRange(grow: any, cb: any): void;
    loopRange(cb: any): void;
    bps(): number[];
    guesslv1(stat: any, bprate: any): any[];
    guess(stat: any, notorderpoint?: number, targetGrow?: any): any[];
    guessWithSpecficLvlPoint(stat: any, point: any, targetGrow: any): any[];
    _handleGuessingGrowRange(growRange: any, stat: any, point: any, oSum: any, oUpSum: any, calcUpBp: any, results: any, result: any, sumBP: any): boolean;
}
declare function RealGuessRaw(Pts: any, input: any): {
    pet: {
        name: any;
        find: boolean;
        lvl: any;
    };
    bps?: undefined;
    results?: undefined;
} | {
    pet: {
        name: any;
        find: boolean;
        lvl: any;
    };
    bps: any[];
    results: any[];
};
declare function RealGuess(Pts: any, name: any, lvl: any, hp: any, mp: any, attack: any, def: any, agi: any, notorderpoint: any, targetGrow: any): {
    pet: {
        name: any;
        find: boolean;
        lvl: any;
    };
    bps?: undefined;
    results?: undefined;
} | {
    pet: {
        name: any;
        find: boolean;
        lvl: any;
    };
    bps: any[];
    results: any[];
};
declare const sumArray: typeof sum;
export { RealGuess, RealGuessRaw, BP, Stat, GrowRange, sumArray, calcDiff, minmax, GuessResultToString, };
