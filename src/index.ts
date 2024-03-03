import { Fraction } from './types.js';

export function addFractions(fractions: string[]): string[] {
  return [];
}

export function parseEquation(equation: string): Fraction[] {
  const fractions = equation.split('+');
  return fractions.map((fraction) => {
    const [numerator, denominator] = fraction.split('/').map(Number);
    return {
      numerator,
      denominator,
    };
  });
}

export function addFractionObjects(fractions: Fraction[]): Fraction {
  const denominator = fractions.reduce((acc, curr) => acc * curr.denominator, 1);
  const numerator = fractions.reduce((acc, curr) => {
    const multiplier = denominator / curr.denominator;
    return acc + multiplier * curr.numerator;
  }, 0);
  return {
    numerator,
    denominator,
  };
}

export function reduceFraction(fraction: Fraction): Fraction {
  const smaller =
    fraction.numerator < fraction.denominator ? fraction.numerator : fraction.denominator;
  let divisor = smaller;
  for (; divisor > 0; divisor--) {
    if (fraction.numerator % divisor === 0 && fraction.denominator % divisor === 0) {
      break;
    }
  }
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
}
