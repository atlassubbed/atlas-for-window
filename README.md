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

```
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

Todo.

### highly performant

Todo.

### edge cases

Todo.