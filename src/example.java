/**
 * IGreeter is a simple Java interface.
 */
interface IGreeter {
    /**
 * Performs a greeting action.
 *
 * Implementations typically print a greeting message (for example, to standard output).
 */
void greet();
}

/**
 * Greeter is a test class; this Javadoc should be detected by ast-grep.
 */
public class Greeter implements IGreeter {
    /**
     * Prints a greeting message to standard output.
     */
    public void greet() {
        System.out.println("Hello from Java");
    }
}

// A top-level function isn’t allowed; use a utility class instead.
class Utils {
    /**
     * Prints a greeting message to standard output.
     *
     * Outputs the literal "Hello function in Java" followed by the platform-specific line terminator.
     */
    static void hello() {
        System.out.println("Hello function in Java");
    }
}