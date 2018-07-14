# atlas-for-window

Generalizes iterating over an array with a sliding window.

[![Travis](https://img.shields.io/travis/atlassubbed/atlas-for-window.svg)](https://travis-ci.org/atlassubbed/atlas-for-window)

---

## install

```
npm install --save atlas-for-window
```

## why

Sometimes you need to iterate over a window of values in an array, and do something "for each window":

```javascript
// window size = 2
[1,2,3,4,5,6]  // main array
[1,2]          // 1st window
  [2,3]        // 2nd window
    [3,4]      // 3rd window
      [4,5]    // 4th window
        [5,6]  // 5th window
```

We'd like to do this without polluting our business logic with iteration logic. This library provides a clean API for iterating over n-windows in an array.

## examples

### highly readable

A single argument gives you a physical window to work with:

```javascript
const { forWindow } = require("atlas-for-window");
const myArray = ["a", "b", "c", "d"];

// iterate over all 2-windows in myArray
forWindow(2, myArray, window => {
  console.log(window);
})

// ['a', 'b']
// ['b', 'c']
// ['c', 'd']
```

### highly performant

Slicing is expensive. Non-unary iterator functions will be given the start and end indexes of the window, which is much, much faster than slicing:

#### nullary iterator function

```javascript
...
forWindow(2, myArray, function(){
  console.log(arguments[0], arguments[1])
})

// 0 2
// 1 3
// 2 4
```

#### binary iterator function

```javascript
...
forWindow(2, myArray, (start, end) => {
  console.log(start, end)
})

// 0 2
// 1 3
// 2 4
```

#### variadic iterator function

```javascript
...
forWindow(2, myArray, (...args) => {
  console.log(...args)
})

// 0 2
// 1 3
// 2 4
```

#### using start and end indexes

Please note that the end index is non-inclusive, allowing you to use the familiar iteration syntax:

```javascript
...
forWindow(2, myArray, (start, end) => {
  const window = [];
  for (let i = start, i < end; i++){ // familiar "i < end"
    window.push(myArray[i])
  }
  console.log(window)
})

// ['a', 'b']
// ['b', 'c']
// ['c', 'd']
```

## caveats

#### edge cases

You don't need to worry about the edge cases. If the desired window size is greater or equal to the parent array size, the iterator will be run exactly once: either with the parent array as the window argument in the case of a unary iterator, or with the arguments `(0, parentArray.length)` in the case of a non-unary iterator.

#### variable step size

Currently, the step size cannot be changed. It seems like a rare use-case, so I might not implement it. If you need the step size to be the length of the window, consider using a simple for-loop and the modulus operator.
