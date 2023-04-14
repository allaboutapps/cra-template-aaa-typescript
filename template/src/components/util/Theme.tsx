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
            main: Colors.SECONDARY_COLOR,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    color: "white",
                    "&:hover": {
                        backgroundColor: Colors.PRIMARY_COLOR_ACTIVE,
                    },
                },
                containedSecondary: {
                    backgroundColor: Colors.SECONDARY_COLOR,
                    color: "white",
                    "&:hover": {
                        backgroundColor: Colors.SECONDARY_COLOR_ACTIVE,
                    },
                },
            },
        },
    },
});
