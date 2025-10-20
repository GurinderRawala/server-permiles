/// Greeter is a trait acting like an interface in Rust.
pub trait Greeter {
    fn greet(&self);
}

/// GreeterImpl is a struct "class" with a doc comment for coverage.
pub struct GreeterImpl;

impl Greeter for GreeterImpl {
    /// Prints a greeting to standard output.
    ///
    /// # Examples
    ///
    /// ```
    /// let g = GreeterImpl;
    /// g.greet();
    /// ```
    fn greet(&self) {
        println!("Hello from Rust");
    }
}

// A free function
/// Prints a simple greeting message to standard output.
///
/// # Examples
///
/// ```
/// example::hello();
/// ```
pub fn hello() {
    println!("Hello function in Rust");
}