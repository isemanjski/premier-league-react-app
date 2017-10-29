import { getRandomInt } from './helpers';

describe('getRandomInt', () => {

  it('should return random number between 1 and 10 (inclusive)', () => {
    const randomNum = getRandomInt(1, 10);
    expect(randomNum >= 1 && randomNum <= 10).toBeTruthy();
  });

  it('should return random number between -1 and -10 (inclusive)', () => {
    const randomNum = getRandomInt(-1, -10);
    expect(randomNum >= -10 && randomNum <= -1).toBeTruthy();
  });

  it('should return correct random number if min is greater than max', () => {
    const randomNum = getRandomInt(10, 1);
    expect(randomNum >= 1 && randomNum <= 10).toBeTruthy();
  });

});
