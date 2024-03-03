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
