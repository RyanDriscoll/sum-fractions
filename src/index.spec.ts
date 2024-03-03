import {
  addFractionObjects,
  addFractions,
  parseEquation,
  reduceFraction,
} from './index.ts';

describe('adding fractions', () => {
  it('adds fractions', () => {
    const result = addFractions(['1/2+2/3', '1/10+5/50']);
    expect(result).toEqual(['7/6', '2/10']);
  });
});

describe('parseEquation', () => {
  it('returns an array of Fraction objects', () => {
    const result = parseEquation('1/2+2/3');
    expect(result).toEqual([
      { numerator: 1, denominator: 2 },
      { numerator: 2, denominator: 3 },
    ]);
  });

  it('can handle more than two fractions', () => {
    const result = parseEquation('1/2+2/3+9/10');
    expect(result).toEqual([
      { numerator: 1, denominator: 2 },
      { numerator: 2, denominator: 3 },
      { numerator: 9, denominator: 10 },
    ]);
  });
});

describe('addFractionObjects', () => {
  it('adds fraction objects together', () => {
    const result = addFractionObjects([
      { numerator: 1, denominator: 5 },
      { numerator: 1, denominator: 10 },
    ]);
    expect(result).toEqual({
      numerator: 15,
      denominator: 50,
    });
  });
});

describe('reduceFraction', () => {
  it.only.each([
    [
      { numerator: 15, denominator: 50 },
      { numerator: 3, denominator: 10 },
    ],
    [
      { numerator: 300, denominator: 100 },
      { numerator: 3, denominator: 1 },
    ],
  ])('reduces the fraction object', (fraction, expected) => {
    expect(reduceFraction(fraction)).toEqual(expected);
  });
});
