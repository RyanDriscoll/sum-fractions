import {
  addFractionObjects,
  handleEquations,
  parseEquation,
  reduceFraction,
  stringifyFraction,
} from './index.ts';

describe('handleEquations', () => {
  it('adds fractions', () => {
    const result = handleEquations(['1/2+2/3', '1/10+5/50']);
    expect(result).toEqual(['7/6', '1/5']);
  });

  it('can add negative numbers for subtraction', () => {
    const result = handleEquations(['1/2+-2/3', '-1/10+5/50']);
    expect(result).toEqual(['-1/6', '0/500']);
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

  it('handles more than two fraction objects', () => {
    const result = addFractionObjects([
      { numerator: 1, denominator: 5 },
      { numerator: 1, denominator: 10 },
      { numerator: 3, denominator: 25 },
    ]);
    expect(result).toEqual({
      numerator: 525,
      denominator: 1250,
    });
  });
});

describe('reduceFraction', () => {
  it.each([
    [
      { numerator: 15, denominator: 50 },
      { numerator: 3, denominator: 10 },
    ],
    [
      { numerator: 300, denominator: 100 },
      { numerator: 3, denominator: 1 },
    ],
    [
      { numerator: 0, denominator: 1000 },
      { numerator: 0, denominator: 1000 },
    ],
    [
      {
        numerator: 525,
        denominator: 1250,
      },
      { numerator: 21, denominator: 50 },
    ],
  ])('reduces the fraction object', (fraction, expected) => {
    expect(reduceFraction(fraction)).toEqual(expected);
  });
});

describe('stringifyFraction', () => {
  it('returns a string representation of a fraction', () => {
    const result = stringifyFraction({ numerator: 1, denominator: 2 });
    expect(result).toBe('1/2');
  });
});
