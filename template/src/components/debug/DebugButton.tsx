import AdbIcon from "@mui/icons-material/Adb";
import { Fab } from "@mui/material";
import { useDebugStore } from "../../stores/debugStore";

export function DebugButton() {
    const [dialogOpen, setDialogOpen] = useDebugStore((state) => [state.dialogOpen, state.setDialogOpen]);
    const reactQueryDevtoolsEnabled = useDebugStore((state) => state.reactQueryDevtoolsEnabled);

    return (
        <div style={{ position: "fixed", left: reactQueryDevtoolsEnabled ? 80 : 10, bottom: 10 }}>
            <Fab
                onClick={() => {
                    setDialogOpen(!dialogOpen);
                }}
                color="primary"
                size="small"
            >
                <AdbIcon />
            </Fab>
        </div>
    );
}
