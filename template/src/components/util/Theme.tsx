import { createMuiTheme } from "@material-ui/core/styles";
import { Styles } from "./Styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: Styles.PRIMARY_COLOR,
        },
        secondary: {
            main: Styles.PRIMARY_COLOR,
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                backgroundColor: Styles.PRIMARY_COLOR,
                color: "white",
                "&:hover": {
                    backgroundColor: Styles.PRIMARY_COLOR_ACTIVE,
                },
            },
        },
    },
});
