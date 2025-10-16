import React from "react";

/**
 * Props is a TS interface for a React component.
 */
export interface Props {
  name: string;
}

/**
 * Greeter is a test class with a docstring; not a React component,
 * but included to test class doc coverage in TSX context.
 */
export class Greeter {
  greet(): void {
    console.log("Hello from TSX context");
  }
}

/** A function component (the "function" example) */
export function Hello(props: Props) {
  return <div>Hello {props.name} from TSX</div>;
}
