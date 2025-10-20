/// Greeter is a protocol (Swift's interface).
protocol Greeter {
    func greet()
}

/// GreeterImpl is a test class with a doc comment for coverage.
class GreeterImpl: Greeter {
    /// Prints a greeting message to standard output.
    /// 
    /// The message produced is "Hello from Swift".
    func greet() {
        print("Hello from Swift")
    }
}

/// Prints a greeting message to standard output.
/// 
/// The message printed is "Hello function in Swift".
func hello() {
    print("Hello function in Swift")
}