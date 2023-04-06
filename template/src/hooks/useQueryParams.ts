import * as queryString from "query-string";
import { useLocation } from "react-router";
import { compact } from "lodash";

// Parse the URLs query param into an object of type T.
// query param keys that represent an array are provided in <arrayKeys>.
//
// E.g. useQueryParams<{name: string; titles: string[];}({arrayKeys: ["titles"]}); to
// parse ?name=Max&titles=BA&titles=MA into { name: "Max", titles: ["BA", "MA"] }
//
// Default to void so we get a compile error, if users are not providing an explicit type. This avoids implicit any.
export const useQueryParams = <T = void>(options?: { arrayKeys?: string[] }) => {
    const location = useLocation();
    const result = queryString.parse(location.search, { parseBooleans: true, arrayFormat: "bracket" }) as any;
    if (options?.arrayKeys) {
        options.arrayKeys.forEach((key) => {
            if (!Array.isArray(result[key])) {
                // Convert single elements to array
                result[key] = [result[key]];
            }
            result[key] = compact(result[key]);
        });
    }

    return result as T;
};
