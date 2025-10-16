package main

import "fmt"

// Greeter is an interface (Go's interface type).
type Greeter interface {
	Greet()
}

// GreeterImpl is a struct "class" with a doc comment for coverage.
type GreeterImpl struct {
	Name string
}

func (g GreeterImpl) Greet() {
	fmt.Println("Hello from Go,", g.Name)
}

// A plain function
func Hello() {
	fmt.Println("Hello function in Go")
}
