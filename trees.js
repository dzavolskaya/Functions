const tree = {
    children: [
      {
        children: [
          {
            children: [],
            meta: { size: 4000 },
            name: 'NgiNx',
            type: 'directory',
          },
          {
            children: [{ meta: { uid: 0 }, name: 'config.JSON', type: 'file' }],
            meta: {},
            name: 'CONSUL',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'eTc',
        type: 'directory',
      },
      { meta: {}, name: 'cohOsts', type: 'file' },
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

const mapTransformer = (f, tree) => {
  const newResult = f(tree);
  if (!tree.children) {
    return { ...newResult };
  }
  return { ...newResult, children: tree.children.map(n => mapTransformer(f, n)) };
};
// console.log(mapTransformer(n => ({ ...n, name: n.name.toUpperCase() }), tree));

const filterTransformer = (f, tree) => {
  if (!f(tree)) return null;
  if (!tree.children) {
    return { ...tree };
  }
  return { ...tree, children: tree.children.map(n => filterTransformer(f, n)).filter(v => v) };
};
// console.log(filterTransformer(n => n.type === 'directory', tree));


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