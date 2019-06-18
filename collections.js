const uniqArray = array => array.reduce(
    (acc, element) => (
      acc.includes(element) ? acc : acc.concat(element)
    ),
    [],
  );
// second possibility with ES6 : export default array => [...new Set( array )];

const wordsCounts = (words, stopWords) => words
  .map(word => word.toLowerCase())
  .filter(word => !stopWords.includes(word))
  .reduce((acc, word) => {
    if (!acc.has(word)) {
      return acc.set(word, 1);
    }
    return acc.set(word, acc.get(word) + 1);
  }, new Map());

const difference = (set1, set2) => 
    new Set(Array.from(set1).filter(element => !set2.has(element)));

// set => no 'filter' etc. but 'has'
// array => yes 'filter' and 'includes'

// ====================================================//
// function to destructure an object 
const getCountperData = (data) => {
    const iter = (items, acc) => {
        if (items.length === 0) {
        return acc;
        }
        const [{ year }, ...rest] = items;
        const yearCounter = acc[year] ? acc[year] += 1 : 1;
        return iter(rest, { ...acc, [year]: yearCounter });
    };
    return iter(data, {});
};

// const cars = [
//   { brand: 'bmw', model: 'm5', year: 2014 },
//   { brand: 'bmw', model: 'm4', year: 2013 },
//   { brand: 'kia', model: 'sorento', year: 2014 },
//   { brand: 'kia', model: 'rio', year: 2010 },
//   { brand: 'kia', model: 'sportage', year: 2012 },
// ];

// console.log(getCountByData(cars));
//  {
//    2010: 1,
//    2012: 1,
//    2013: 1,
//    2014: 2,
//  };
// ====================================================//

// function to find intersection of arrays
const intersection = (array1, array2) => {
    const filtered = array1.filter(value => array2.includes(value));
    return [...new Set(filtered)];
  };

// function to exlude element
const without = (arr1, ...elements) => {
    const set = new Set(elements);
    return arr1.filter(value => !set.has(value));
};

// function to represent array of pairs as object (objectFromArray([['cat', 5], ['dog', 6], ['cat', 11]])
const objectFromArray = pairs => { 
    return pairs.reduce((acc, item) => {
      const [key, value] = item;
      return ({ ...acc, [key] : value });
    }, []);
  };

// function to find an odd number (const numbers = [1, 2, 4, 2, 4, 1, 5, 3, 3])
const findOddNumber = (array) => {
    const callbackFunc = (acc, el) => (acc.has(el) ? acc.set(el, acc.get(el) + 1) : acc.set(el, 1));
    const objMap = array.reduce(callbackFunc, new Map());

    const entries = objMap.entries();
    for (const entry of entries) {
        if (entry[1] % 2 !== 0) {
        return entry[0];
        }
    }
    return result(entries);
};

// ====================================================//
// function to enlarge array 
const enlargeArrayImage = (arr) => {
    const doubled = (acc, element) => ([...acc, element, element]);
    return arr.map(element => element.reduce(doubled, []), []).reduce(doubled, []);
};

// const arr = [
//     ['*', '*', '*', '*'],
//     ['*', ' ', ' ', '*'],
//     ['*', ' ', ' ', '*'],
//     ['*', '*', '*', '*'],
//   ];
//   // ****
//   // *  *
//   // *  *
//   // ****
  
//   enlargeArrayImage(arr);
//   // ********
//   // ********
//   // **    **
//   // **    **
//   // **    **
//   // **    **
//   // ********
//   // ********

// ====================================================//