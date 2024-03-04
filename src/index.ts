import { Fraction } from './types.ts';

/**
 * handleEquations
 *
 * takes equation strings containing fractions that need to be summed
 * and returns string results
 * @param equations string[]
 * @returns string[]
 */
export function handleEquations(equations: string[]): string[] {
  return equations.map((equation) => {
    const fractions = parseEquation(equation);
    const fractionSum = addFractionObjects(fractions);
    const reducedFraction = reduceFraction(fractionSum);
    return stringifyFraction(reducedFraction);
  });
}

/**
 * parseEquation
 *
 * takes an equation string and splits it into an array of Fraction objects
 * @param equation string
 * @returns Fraction[]
 */
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

/**
 * addFractionObjects
 *
 * takes an array of Fraction objects and returns a single Fraction object
 * containing the sum of all the fractions
 * @param fractions Fraction[]
 * @returns Fraction
 */
export function addFractionObjects(fractions: Fraction[]): Fraction {
  // multiplying all denominators creates a common denominator
  const denominator = fractions.reduce((den, fraction) => den * fraction.denominator, 1);
  const numerator = fractions.reduce((num, fraction) => {
    // get multiplier by dividing our common denominator by the fraction's denominator
    const multiplier = denominator / fraction.denominator;
    // multiply the numerator by the multiplier and add it to the accumulated value
    return multiplier * fraction.numerator + num;
  }, 0);

  return {
    numerator,
    denominator,
  };
}

/**
 * reduceFraction
 *
 * takes a Fraction object and returns a new Fraction reduced as much as possible
 * @param fraction Fraction
 * @returns Fraction
 */
export function reduceFraction(fraction: Fraction): Fraction {
  const num = Math.abs(fraction.numerator);
  const den = Math.abs(fraction.denominator);
  // get the smaller absolute value (distance from zero) between numerator and denominator
  const smaller = num < den ? num : den;

  // if the value is zero or one it cannot be reduced further. return the original fraction
  if (smaller <= 1) {
    return fraction;
  }

  let divisor = smaller;
  for (; divisor > 0; divisor--) {
    // find a divisor where both the numerator and denominator can be evenly divided
    if (Object.values(fraction).every((val) => val % divisor === 0)) {
      break;
    }
  }
  // return the reduced fraction
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
}

/**
 * stringifyFraction
 *
 * takes a Fraction object and returns a string representation of the fraction
 * @param fraction Fraction
 * @returns string
 */
export function stringifyFraction(fraction: Fraction): string {
  return `${fraction.numerator}/${fraction.denominator}`;
}
