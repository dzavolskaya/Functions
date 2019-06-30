const nestedArray = [
    ['key', [['key3', 'anotherValue']]],
    ['key2', 'value2']
  ];

  //function to convert nested array into nested object
  const convertArray = array => array
    .reduce((acc, item) => {
      const [key, value] = item;
      return { ...acc, [key]: Array.isArray(value) ? convertArray(value) : value };
    }, {});
  //OR
  const convertArray2 = array => array.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value instanceof Array ? convertArray2(value) : value }),
    {},
  );