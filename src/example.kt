/**
 * IGreeter is a Kotlin interface.
 */
interface IGreeter {
    fun greet()
}

/**
 * Greeter is a test class with KDoc for coverage.
 */
class Greeter : IGreeter {
    override fun greet() = println("Hello from Kotlin")
}

// A top-level function
fun hello() = println("Hello function in Kotlin")
