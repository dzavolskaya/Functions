const difference = (set1, set2) => 
    new Set(Array.from(set1).filter(element => !set2.has(element)));

// set => no 'filter' etc. but 'has'
// array => yes 'filter' and 'includes'