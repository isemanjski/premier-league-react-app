import { getRandomInt, isNil, isNotNil } from './helpers';

describe('getRandomInt', () => {

  it('should return random number between 1 and 10 (inclusive)', () => {
    const randomNum = getRandomInt(1, 10);
    expect(randomNum >= 1 && randomNum <= 10).toBe(true);
  });

  it('should return random number between -1 and -10 (inclusive)', () => {
    const randomNum = getRandomInt(-1, -10);
    expect(randomNum >= -10 && randomNum <= -1).toBe(true);
  });

  it('should return correct random number if min is greater than max', () => {
    const randomNum = getRandomInt(10, 1);
    expect(randomNum >= 1 && randomNum <= 10).toBe(true);
  });

});

describe('isNil', () => {

  it('should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNil()).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for non-nils', () => {
    expect(isNil('a')).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil(true)).toBe(false);
    expect(isNil({ 'a': 1 })).toBe(false);
    expect(isNil([1, 2, 3])).toBe(false);
    expect(isNil(new Date)).toBe(false);
    expect(isNil(new Error)).toBe(false);
  });

});

describe('isNotNil', () => {

  it('should return false for null', () => {
    expect(isNotNil(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNotNil()).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
  });

  it('should return true for non-nils', () => {
    expect(isNotNil('a')).toBe(true);
    expect(isNotNil(1)).toBe(true);
    expect(isNotNil(true)).toBe(true);
    expect(isNotNil({ 'a': 1 })).toBe(true);
    expect(isNotNil([1, 2, 3])).toBe(true);
    expect(isNotNil(new Date)).toBe(true);
    expect(isNotNil(new Error)).toBe(true);
  });

});
