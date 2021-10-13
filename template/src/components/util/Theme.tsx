import { createTheme } from "@mui/material";
import { Styles } from "./Styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: Styles.PRIMARY_COLOR,
        },
        secondary: {
            main: Styles.PRIMARY_COLOR,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: Styles.PRIMARY_COLOR,
                    color: "white",
                    "&:hover": {
                        backgroundColor: Styles.PRIMARY_COLOR_ACTIVE,
                    },
                },
            },
        },
    },
});
