// function to exlude element
const without = (arr1, ...elements) => {
    const set = new Set(elements);
    return arr1.filter(value => !set.has(value));
};