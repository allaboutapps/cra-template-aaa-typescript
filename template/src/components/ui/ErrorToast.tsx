import { Slide, Snackbar } from "@mui/material";
import { observer } from "mobx-react";
import { generalStore } from "../../stores/GeneralStore";
import { Colors } from "../util/Colors";

const SlideTransition = (props: any) => <Slide {...props} direction="up" />;

export const ErrorToast = observer(() => {
    const handleClose = () => {
        generalStore.popError();
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!generalStore.error}
            key={generalStore.error?.message}
            onClose={handleClose}
            autoHideDuration={5000}
            message={generalStore.error?.message}
            TransitionComponent={SlideTransition}
            ContentProps={{
                style: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                },
            }}
        />
    );
});
