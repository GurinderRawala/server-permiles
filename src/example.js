/**
 * Describes an object capable of producing a greeting.
 *
 * Implementations are expected to provide a `greet()` method that performs the greeting action.
 *
 * @interface
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

/**
 * Logs a greeting message to the console.
 */
function hello() {
  console.log("Hello function in JavaScript");
}