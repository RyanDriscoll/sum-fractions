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
