import { Fraction } from './types.ts';

export function handleEquations(equations: string[]): string[] {
  return equations.map((equation) => {
    const fractions = parseEquation(equation);
    const fractionSum = addFractionObjects(fractions);
    const reducedFraction = reduceFraction(fractionSum);
    return stringifyFraction(reducedFraction);
  });
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
    Math.abs(fraction.numerator) < Math.abs(fraction.denominator)
      ? Math.abs(fraction.numerator)
      : Math.abs(fraction.denominator);
  if (smaller === 0) {
    return fraction;
  }
  let divisor = smaller;
  for (; divisor > 0; divisor--) {
    if (Object.values(fraction).every((val) => val % divisor === 0)) {
      break;
    }
  }
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
}

export function stringifyFraction(fraction: Fraction): string {
  return `${fraction.numerator}/${fraction.denominator}`;
}
