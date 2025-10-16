/// Greeter is a protocol (Swift's interface).
protocol Greeter {
    func greet()
}

/// GreeterImpl is a test class with a doc comment for coverage.
class GreeterImpl: Greeter {
    func greet() {
        print("Hello from Swift")
    }
}

// A free function
func hello() {
    print("Hello function in Swift")
}
