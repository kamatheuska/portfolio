/**
 * Configuration options for an environment variable
 */
export interface EnvVarConfig {
    /** If true, throws error if the environment variable is missing */
    required?: boolean;
    /** Default value to use if the environment variable is not set */
    default?: string;
}

/**
 * Evaluates process.env against a configuration Map
 * @param config - Map with env var names as keys and config objects as values
 * @returns Map with env var names as keys and their values from process.env
 * @throws {Error} If required env vars are missing
 */
export function evaluateEnv(config: Map<string, EnvVarConfig>): Map<string, string | undefined> {
    const result: Map<string, string | undefined> = new Map();
    const missing: string[] = [];

    for (const [key, options] of config) {
        const value: string | undefined = process.env[key];

        // Check if value exists in process.env
        if (value === undefined) {
            // Handle required vars
            if (options.required === true) {
                missing.push(key);
                continue;
            }

            // Use default if provided
            if ("default" in options) {
                result.set(key, options.default);
                continue;
            }

            // No value, not required, no default
            result.set(key, undefined);
        } else {
            // Value exists in process.env
            result.set(key, value);
        }
    }

    // Throw error if any required vars are missing
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    return result;
}
