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