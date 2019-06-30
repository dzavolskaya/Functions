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