import { createBrowserHistory } from "history";
import { BASE_NAME } from "../../config";

export const history = createBrowserHistory({ basename: BASE_NAME || "/" });
