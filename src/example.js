/**
 * @interface
 * IGreeter is a JSDoc interface for coverage testing in JS.
 */
function IGreeter() {}
/** @type {function(): void} */
IGreeter.prototype.greet;

/**
 * Greeter is a class with a JSDoc docstring.
 */
class Greeter /* implements IGreeter (by convention) */ {
  /** Create a Greeter */
  constructor() {}
  /** @returns {void} */
  greet() {
    console.log("Hello from JavaScript");
  }
}

// A plain function
function hello() {
  console.log("Hello function in JavaScript");
}
