/**
 * IGreeter is a TypeScript interface.
 */
export interface IGreeter {
  greet(): void;
}

/**
 * Greeter is a test class with a JSDoc/KDoc-style doc for coverage.
 */
export class Greeter implements IGreeter {
  greet(): void {
    console.log("Hello from TypeScript");
  }
}

/**
 * Logs a simple greeting message to the console.
 */
export function hello(): void {
  console.log("Hello function in TypeScript");
}