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

//reduce for trees
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