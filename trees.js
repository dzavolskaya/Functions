const tree = {
    children: [
      {
        children: [
          {
            children: [],
            meta: {},
            name: 'NgiNx',
            type: 'directory',
          },
          {
            children: [{ meta: {  size: 1200 }, name: 'config.JSON', type: 'file' }],
            meta: {},
            name: 'CONSUL',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'eTc',
        type: 'directory',
      },
      { meta: { size: 8200 }, name: 'cohOsts', type: 'file' },
      { meta: { size: 400 }, name: 'resolve', type: 'file' },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };


const downcaseFileNames = (tree) => {
  if (tree.type === 'file') {
    return { ...tree, name: tree.name.toLowerCase() };
  }
  if (!tree.children) {
    return { ...tree };
  }
  return { ...tree, children: tree.children.map(downcaseFileNames)};
};

//map function for trees
const mapTransformer = (f, tree) => {
  const newResult = f(tree);
  if (!tree.children) {
    return { ...newResult };
  }
  return { ...newResult, children: tree.children.map(n => mapTransformer(f, n)) };
};
// console.log(mapTransformer(n => ({ ...n, name: n.name.toUpperCase() }), tree));

//filter function for trees
const filterTransformer = (f, tree) => {
  if (!f(tree)) return null;
  if (!tree.children) {
    return { ...tree };
  }
  return { ...tree, children: tree.children.map(n => filterTransformer(f, n)).filter(v => v) };
};
// console.log(filterTransformer(n => n.type === 'directory', tree));

//reduce function to count number of files in the tree
const reduceTransformer = (f, tree, acc) => {
  const newAcc = f(acc,tree);
  if (tree.type === 'file') {
    return newAcc;
  }
  return tree.children.reduce((iAcc, n) => reduceTransformer(f, n, iAcc), newAcc);
};
// console.log(reduceTransformer((acc, n) => acc + 1, tree, 0));


// import path from 'path'; (path module has to be installed)
const findFilesByName = (tree, str) => {
  const iter = (n, currPath, acc) => {
    const newPath = path.join(currPath, n.name);
    if (n.type === 'file') {
      return (n.name.includes(str)) ? [...acc, newPath] : acc;
    }
    return n.children.reduce((cAcc, nn) => iter(nn, newPath, cAcc), acc);
  };
  return iter(tree, '', []);
};
//console.log(findFilesByName(tree, 'co'));

// ====================================================//
//function reduce for trees
const reduce = (f, tree, acc) => {
  const newAcc = f(acc,tree);
  if (!tree.children) {
    return newAcc;
  }
  return tree.children.reduce((iAcc, n) => reduceTransformer(f, n, iAcc), newAcc);
};

//function to simulate Linux command 'du'
const du = (tree) => {
  const countFilesSize = node => reduce(
    (acc, n) => (n.type === 'file' ? acc + n.meta.size : acc), node,
    0,
  );
  if (!tree.children) {
    if (tree.type === 'file') {
      return [tree.name, tree.meta.size];
    }
  }
  const result = reduce((acc, element) => {
    if (element.type === 'directory' && tree.children.length !== 0) {
      return tree.children
        .map(el => [el.name, countFilesSize(el)]);
    }
    return acc;
  }, tree, []);
  return result.sort((a, b) => (b[1] - a[1]));
};
//console.log(du(tree));
// ====================================================//

const list = [1, 2, [3, 5], [[4, 3], 2]];

const flatten = list => list
  .reduce((acc, element) => acc.concat(Array.isArray(element) ? flatten(element) : element), []);

//OR
const flatten2 = list => list.reduce((acc, element) => {
  const result = (Array.isArray(element) ? [...acc, ...flatten(element)] : [...acc, element]);
  return result;
}, []);

//==================================================//
//function to convert nested array into nested object
const nestedArray = [
  ['key', [['key3', 'anotherValue']]],
  ['key2', 'value2']
];
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
//==================================================//
