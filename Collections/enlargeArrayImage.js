// function to enlarge array 
const enlargeArrayImage = (arr) => {
    const doubled = (acc, element) => ([...acc, element, element]);
    return arr.map(element => element.reduce(doubled, []), []).reduce(doubled, []);
};

// const arr = [
//     ['*', '*', '*', '*'],
//     ['*', ' ', ' ', '*'],
//     ['*', ' ', ' ', '*'],
//     ['*', '*', '*', '*'],
//   ];
//   // ****
//   // *  *
//   // *  *
//   // ****
  
//   enlargeArrayImage(arr);
//   // ********
//   // ********
//   // **    **
//   // **    **
//   // **    **
//   // **    **
//   // ********
//   // ********
