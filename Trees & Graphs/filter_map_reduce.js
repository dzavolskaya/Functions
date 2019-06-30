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


//map function for trees
const map = (f, tree) => {
    const newResult = f(tree);
    if (!tree.children) {
      return { ...newResult };
    }
    return { ...newResult, children: tree.children.map(n => map(f, n)) };
  };
  // console.log(mapTransformer(n => ({ ...n, name: n.name.toUpperCase() }), tree));
  
  //filter function for trees
  const filter = (f, tree) => {
    if (!f(tree)) return null;
    if (!tree.children) {
      return { ...tree };
    }
    return { ...tree, children: tree.children.map(n => filter(f, n)).filter(v => v) };
  };
  // console.log(filterTransformer(n => n.type === 'directory', tree));
  
  //reduce function to count number of files
  const reduce = (f, tree, acc) => {
    const newAcc = f(acc,tree);
    if (tree.type === 'file') {
      return newAcc;
    }
    return tree.children.reduce((iAcc, n) => reduce(f, n, iAcc), newAcc);
  };
  // console.log(reduceTransformer((acc, n) => acc + 1, tree, 0));
    