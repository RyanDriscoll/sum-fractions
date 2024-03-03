import { addFractions } from './index.ts';

describe('adding fractions', () => {
  it('adds fractions', () => {
    const result = addFractions(['1/2+2/3', '1/10+5/50']);
    expect(result).toEqual(['7/6', '2/10']);
  });
});
