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
  const denominator = fractions.reduce((acc, curr) => acc * curr.denominator, 1);
  const numerator = fractions.reduce((acc, curr) => {
    // get multiplier by dividing our common denominator by the fraction's denominator
    const multiplier = denominator / curr.denominator;
    // multiply the numerator by the same value and add it to the other numerators
    return acc + multiplier * curr.numerator;
  }, 0);
  return {
    numerator,
    denominator,
  };
}

/**
 * reduceFraction
 *
 * takes a Fraction object and returns a new Fraction recuced as much as possible
 * @param fraction Fraction
 * @returns Fraction
 */
export function reduceFraction(fraction: Fraction): Fraction {
  // get the smaller absolute value (distance from zero) between numerator and denominator
  const smaller =
    Math.abs(fraction.numerator) < Math.abs(fraction.denominator)
      ? Math.abs(fraction.numerator)
      : Math.abs(fraction.denominator);

  // if the value is zero it cannot be reduced further. return the original fraction
  if (smaller === 0) {
    return fraction;
  }

  let divisor = smaller;
  for (; divisor > 0; divisor--) {
    // find a divisor that both the numerator and denominator can be evenly divided by
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
