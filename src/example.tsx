import React from "react";

/**
 * Props is a TS interface for a React component.
 */
export interface Props {
  name: string;
}

export class Greeter {
  greet(): void {
    console.log("Hello from TSX context");
  }
}

/**
 * Render a greeting element that includes the provided name.
 *
 * @param props - Component props containing the `name` to display
 * @returns A JSX element that displays "Hello {name} from TSX"
 */
export function Hello(props: Props) {
  return <div>Hello {props.name} from TSX</div>;
}

/**
 * Renders a greeting "Hi {name} from TSX" inside a div.
 *
 * @param props - Component props containing the `name` to display
 * @returns A React element containing the greeting
 */
export function Hi(props: Props) {
  return <div>Hi {props.name} from TSX</div>;
}