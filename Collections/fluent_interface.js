// FLUENT INTERFACE pattern

const cars = [
    { brand: 'bmw', model: 'm5', year: 2014 },
    { brand: 'bmw', model: 'm4', year: 2013 },
    { brand: 'kia', model: 'sorento', year: 2014 },
    { brand: 'kia', model: 'rio', year: 2010 },
    { brand: 'kia', model: 'sportage', year: 2012 },
  ];
  coll = new Enumerable(cars);

// const result = coll.orderBy(car => car.year, 'desc')
// .where(car => car.brand === 'bmw')
// .select(car => car.model);

// assert.deepEqual(result.toArray(), ['m5', 'm4']);
  
class Enumerable {
    constructor(collection) {
      this.collection = collection;
    }
  
    select(fn) {
      this.collection = this.collection.map(fn);
      return this;
    }
  
    orderBy(fn, direction = 'asc') {
      const compareResult = direction === 'asc' ? 1 : -1;
      const comparator = (a, b) => {
        const a1 = fn(a);
        const b1 = fn(b);
        if (a1 > b1) {
          return compareResult;
        }
        if (a1 < b1) {
          return -compareResult;
        }
        return 0;
      };
      this.collection.sort(comparator);
      return this;
    }
  
    where(fn) {
      this.collection = this.collection.filter(fn);
      return this;
    }
  
    toArray() {
      return this.collection.slice();
    }
  }
  
  export default Enumerable;

