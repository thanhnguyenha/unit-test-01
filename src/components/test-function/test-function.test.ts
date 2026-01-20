import { expect, describe, it } from 'vitest'
import { araySort } from './test-function'

const test = it.extend({
  array: [7,4,2,8,1,9,3,6,5]
})

describe('test sort function', () => {
  test('sort ascending order', ({ array }) => {
    expect(araySort(array)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(araySort(array)).toHaveLength(9);
  })
  test('sort ascending order empty', ({ array }) => {
    expect(araySort([])).toHaveLength(0);
  })
  test('sort descending order', ({ array }) => {
    expect(araySort(array, 'desc')).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])
  })
  test('sort descending order empty', ({ array }) => {
    expect(araySort([], 'desc')).toHaveLength(0);
  })
  test.skip('sort descending order undefined', ({ array }) => {
    expect(() => araySort([undefined], 'desc')).toThrow('Array is not valid');
  })
})