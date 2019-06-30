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