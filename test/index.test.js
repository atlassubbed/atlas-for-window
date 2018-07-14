const { describe, it } = require("mocha")
const { expect } = require("chai")
const { forWindow } = require("../src/index")

describe("fowWindow", function(){
  describe("runs each task with a start and end index", function(){
    it("should not run the task if parent array is empty", function(){
      let taskCalled = 0, parent = [], task = (s, e) => taskCalled++
      forWindow(1, parent, task);
      expect(taskCalled).to.equal(0);
    })
    it("should do nothing if the window size is 0", function(){
      let taskCalled = 0, parent = [], task = (s, e) => taskCalled++
      forWindow(0, parent, task);
      expect(taskCalled).to.equal(0);
    })
    it("should run tasks with correct start and end indexes for window size === 1", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedIndexes = [[0,1], [1,2], [2,3], [3,4]]
      forWindow(1, parent, (start, end) => {
        const expectedIndex = expectedIndexes[taskCalled++];
        expect(start).to.equal(expectedIndex[0])
        expect(end).to.equal(expectedIndex[1]);
      })
      expect(taskCalled).to.equal(4)
    })
    it("should run tasks with correct start and end indexes for window size > 1", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedIndexes = [[0,2], [1,3], [2,4]]
      forWindow(2, parent, (start, end) => {
        const expectedIndex = expectedIndexes[taskCalled++];
        expect(start).to.equal(expectedIndex[0])
        expect(end).to.equal(expectedIndex[1]);
      })
      expect(taskCalled).to.equal(3)
    })
    it("should run task once with correct indexes if window size === parent size", function(){
      let taskCalled = 0, parent = [1,2,3,4];
      forWindow(4, parent, (start, end) => {
        taskCalled++;
        expect(start).to.equal(0)
        expect(end).to.equal(4)
      })
      expect(taskCalled).to.equal(1)
    })
    it("should run task once with correct indexes if window size > parent size", function(){
      let taskCalled = 0, parent = [1,2,3,4];
      forWindow(5, parent, (start, end) => {
        taskCalled++;
        expect(start).to.equal(0)
        expect(end).to.equal(4)
      })
      expect(taskCalled).to.equal(1)
    })
    it("should run the task with indexes if given variadic args", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedIndexes = [[0,3],[1,4]]
      forWindow(3, parent, (...args) => {
        const expectedIndex = expectedIndexes[taskCalled++];
        expect(args[0]).to.equal(expectedIndex[0])
        expect(args[1]).to.equal(expectedIndex[1]);
      })
      expect(taskCalled).to.equal(2)
    })
    it("should run the task with indexes if given no args", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedIndexes = [[0,3],[1,4]]
      forWindow(3, parent, function(){
        const expectedIndex = expectedIndexes[taskCalled++];
        expect(arguments[0]).to.equal(expectedIndex[0])
        expect(arguments[1]).to.equal(expectedIndex[1]);
      })
      expect(taskCalled).to.equal(2)
    })
  })
  describe("runs each task with a subarray (window)", function(){
    it("should not run the task if parent array is empty", function(){
      let taskCalled = 0, parent = [], task = win => taskCalled++
      forWindow(1, parent, task);
      expect(taskCalled).to.equal(0);
    })
    it("should do nothing if the window size is 0", function(){
      let taskCalled = 0, parent = [], task = win => taskCalled++
      forWindow(0, parent, task);
      expect(taskCalled).to.equal(0);
    })
    it("should run tasks with correct subarray for window size === 1", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedWindows = [[1],[2],[3],[4]]
      forWindow(1, parent, win => {
        const expectedWindow = expectedWindows[taskCalled++];
        expect(win).to.deep.equal(expectedWindow)
      })
      expect(taskCalled).to.equal(4)
    })
    it("should run tasks with correct subarray for window size > 1", function(){
      let taskCalled = 0, parent = [1,2,3,4], expectedWindows = [[1,2],[2,3],[3,4]]
      forWindow(2, parent, win => {
        const expectedWindow = expectedWindows[taskCalled++];
        expect(win).to.deep.equal(expectedWindow)
      })
      expect(taskCalled).to.equal(3)
    })
    it("should run task once with correct subarray if window size === parent size", function(){
      let taskCalled = 0, parent = [1,2,3,4];
      forWindow(4, parent, win => {
        taskCalled++;
        expect(win).to.deep.equal(parent)
      })
      expect(taskCalled).to.equal(1)
    })
    it("should run task once with correct subarray if window size > parent size", function(){
      let taskCalled = 0, parent = [1,2,3,4];
      forWindow(5, parent, win => {
        taskCalled++;
        expect(win).to.deep.equal(parent)
      })
      expect(taskCalled).to.equal(1)
    })
  })
})
