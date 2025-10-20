/**
 * IGreeter is a Kotlin interface.
 */
interface IGreeter {
    /**
 * Prints a greeting message to standard output.
 */
fun greet()
}

/**
 * Greeter is a test class with KDoc for coverage.
 */
class Greeter : IGreeter {
    /**
 * Prints a greeting message to standard output.
 */
override fun greet() = println("Hello from Kotlin")
}

/**
 * Prints "Hello function in Kotlin" to standard output.
 */
fun hello() = println("Hello function in Kotlin")