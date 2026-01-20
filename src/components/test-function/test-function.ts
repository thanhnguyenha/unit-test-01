const araySort = (array: any, order: 'asc' | 'desc' = 'asc') => {
  if (!Array.isArray(array)) {
    throw new Error('Array is not valid');
  }
  for (const item of array) {
    if (typeof item !== 'number') {
      throw new Error('Array contains non-number items');
    }
  }
  return array.sort((a, b) => {
    if (order === 'asc') {
      return a - b
    }
    return b - a
  })
}

const reverseArray = (array: number[]) => {
  return array.reverse()
}

export { araySort, reverseArray }
