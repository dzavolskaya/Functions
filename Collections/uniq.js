const uniqArray = array => array.reduce(
    (acc, element) => (
      acc.includes(element) ? acc : acc.concat(element)
    ),
    [],
  );
// OR

const uniqArray2 = array => [...new Set( array )];