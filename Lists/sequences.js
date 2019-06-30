//npm install @hexlet/pairs-data --save
import { l, cons, head, tail } from '@hexlet/pairs-data'; // eslint-disable-line

const list1 = l('foo', 'bar', 'baz');
const list2 = l('example');

// append is done to the head => naturally reversed result, need to reverse for correct output
const filter = (f, htmlList) => {
  const iter = (element, acc) => {
    if (element === null) return reverse(acc);
    const newElement = head(element);
    const newResult = f(newElement) ? cons(newElement, acc) : acc;
    return iter(tail(element), newResult);
    }
  return iter(htmlList, l());
};

// function map through tail recursion
const map = (f, htmlList) => {
  const iter = (htmlList, acc) => {
    if (isEmpty(htmlList)) return reverse(acc); 
    return iter(tail(htmlList),cons(f(head(htmlList)), acc));
  }
  return iter(htmlList, l());
};

//function map through classic recursion
// const map = (f, htmlList) => {
//   if (isEmpty(htmlList)) return null; 
//   let newElement = head(htmlList);
//   return cons(f(newElement), map(f, tail(htmlList)));
// };


//recursive function to check if an element is in the list
const has = (list, x) => {
  if (list === null) {
    return false;
  }
  if (list === x) {
      return true;
  }
    return has(tail(list), x);
}

//tail recursion to reverse a list
const reverse = list => {
  if (list === null ) return list;
  const iter = (list, acc) => {
    if (list === null) {
     return acc;
    }
    return iter(tail(list), cons(head(list), acc));
  }
  return iter(tail(list), l(head(list)));
};

//recursion to concatenate 2 lists of tuples
const concat = (tuple1, tuple2) => {
  if(tuple1 === null) return tuple2;
  return cons(head(tuple1), concat(tail(tuple1),tuple2));
 };