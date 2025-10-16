/**
 * IGreeter is a simple Java interface.
 */
interface IGreeter {
    void greet();
}

/**
 * Greeter is a test class; this Javadoc should be detected by ast-grep.
 */
public class Greeter implements IGreeter {
    public void greet() {
        System.out.println("Hello from Java");
    }
}

// A top-level function isn’t allowed; use a utility class instead.
class Utils {
    static void hello() {
        System.out.println("Hello function in Java");
    }
}
