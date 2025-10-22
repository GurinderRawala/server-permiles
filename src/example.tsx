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

export function Hello(props: Props) {
  return <div>Hello {props.name} from TSX</div>;
}

export function Hi(props: Props) {
  return <div>Hi {props.name} from TSX</div>;
}
