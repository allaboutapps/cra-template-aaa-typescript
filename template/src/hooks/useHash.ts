import { useLocation } from "react-router";
import * as queryString from "query-string";

// Default to void so we get a compile error, if users are not providing an explicit type. This avoids implicit any.
export const useHash = <T = void>(options?: { arrayKeys?: string[] }) => {
    const location = useLocation();
    const result = queryString.parse(location.hash) as any;
    if (options?.arrayKeys) {
        options.arrayKeys.forEach(key => {
            if (!Array.isArray(result[key])) {
                // Convert single elements to array
                result[key] = [result[key]];
            }
        });
    }

    return result as T;
};
