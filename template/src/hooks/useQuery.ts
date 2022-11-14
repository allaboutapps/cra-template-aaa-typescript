import * as queryString from "query-string";
import { useLocation } from "react-router";
import { compact } from "lodash";

// Default to void so we get a compile error, if users are not providing an explicit type. This avoids implicit any.
export const useQuery = <T = void>(options?: { arrayKeys?: string[] }) => {
    const location = useLocation();
    const result = queryString.parse(location.search, { parseBooleans: true }) as any;
    if (options?.arrayKeys) {
        options.arrayKeys.forEach(key => {
            if (!Array.isArray(result[key])) {
                // Convert single elements to array
                result[key] = [result[key]];
            }
            result[key] = compact(result[key]);
        });
    }

    return result as T;
};
