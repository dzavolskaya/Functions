import { l, cons, head, tail } from 'hexlet-pairs-data'; // eslint-disable-line

//recursive function to check if an element is in the list
export const has = (list, x) => {
  if (list === null) {
    return false;
  }
  if (list === x) {
      return true;
  }
    return has(tail(list), x);
}

//tail recursion to reverse a list
export const reverse = list => {
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
export const concat = (tuple1, tuple2) => {
  if(tuple1 === null) return tuple2;
  return cons(head(tuple1), concat(tail(tuple1),tuple2));
 }
