import { Slide, Snackbar } from "@mui/material";
import { useGeneralStore } from "../../stores/generalStore";
import { Colors } from "../util/Colors";

const SlideTransition = (props: any) => <Slide {...props} direction="up" />;

export const ErrorToast = () => {
    const [error, popError] = useGeneralStore((state) => [state.getError(), state.popError]);
    const handleClose = () => {
        popError();
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!error}
            key={error?.message}
            onClose={handleClose}
            autoHideDuration={2000}
            message={error?.message}
            TransitionComponent={SlideTransition}
            ContentProps={{
                style: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                },
            }}
        />
    );
};
