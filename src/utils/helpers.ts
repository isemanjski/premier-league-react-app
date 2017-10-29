/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - Min value
 * @param {number} max - Max value
 * @returns {number} Random number between min and max
 */
export function getRandomInt(min: number, max: number) {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
