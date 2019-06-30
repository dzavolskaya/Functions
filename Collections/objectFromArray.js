// function to represent array of pairs as object (objectFromArray([['cat', 5], ['dog', 6], ['cat', 11]])
const objectFromArray = pairs => { 
    return pairs.reduce((acc, item) => {
      const [key, value] = item;
      return ({ ...acc, [key] : value });
    }, []);
  };