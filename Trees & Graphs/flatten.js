const list = [1, 2, [3, 5], [[4, 3], 2]];

const flatten = list => list
  .reduce((acc, element) => acc.concat(Array.isArray(element) ? flatten(element) : element), []);

//OR

const flatten2 = list => list.reduce((acc, element) => {
  const result = (Array.isArray(element) ? [...acc, ...flatten(element)] : [...acc, element]);
  return result;
}, []);