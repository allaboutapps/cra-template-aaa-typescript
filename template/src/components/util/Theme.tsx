import { createTheme } from "@mui/material";
import { Colors } from "./Colors";

export const theme = createTheme({
    typography: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: Colors.PRIMARY_COLOR,
        },
        secondary: {
            main: Colors.PRIMARY_COLOR,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    color: "white",
                    "&:hover": {
                        backgroundColor: Colors.PRIMARY_COLOR_ACTIVE,
                    },
                },
            },
        },
    },
});
