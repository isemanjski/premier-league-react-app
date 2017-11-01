// tslint:disable:no-any

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - Min value
 * @param {number} max - Max value
 * @returns {number} Random number between min and max
 */
export function getRandomInt(min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if value is `null` or `undefined`, else false.
 */
export function isNil(value?: any): boolean {
  return value === undefined || value === null;
}

/**
 * Checks if `value` is not `null` or `undefined`.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if value is not `null` or `undefined`, else false.
 */
export function isNotNil(value?: any): boolean {
  return !isNil(value);
}

/**
 * Tests if component has children defined.
 *
 * @param {Object} children - The children prop of a component.
 * @returns {Boolean} Returns true if component has at least one child, else false.
 */
export function hasChildren(children: any): boolean {
  return !isNil(children) && Array.isArray(children) && children.length > 0;
}
