import queryString from "query-string";

// Parse the URLs hash param into an object of type T.
// hash param keys that represent an array are provided in <arrayKeys>.
//
// E.g. useHashParams<{name: string; titles: string[];}({arrayKeys: ["titles"]}); to
// parse #name=Max&titles=BA&titles=MA into { name: "Max", titles: ["BA", "MA"] }
//
// Default to void so we get a compile error, if users are not providing an explicit type. This avoids implicit any.
export const useHashParams = <T = void>(options?: { arrayKeys?: string[] }) => {
    const location = window.location;
    const result = queryString.parse(location.hash, { parseBooleans: true, arrayFormat: "bracket" }) as any;
    if (options?.arrayKeys) {
        options.arrayKeys.forEach((key) => {
            if (!Array.isArray(result[key])) {
                // Convert single elements to array
                result[key] = [result[key]];
            }
        });
    }

    return result as T;
};
