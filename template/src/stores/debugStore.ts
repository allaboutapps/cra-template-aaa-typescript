import { combine, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export type IDebugTab = "design" | "functionality";

export const useDebugStore = create(
    devtools(
        persist(
            combine(
                {
                    enabled: false,

                    stringKeysVisible: false,

                    reactQueryDevtoolsEnabled: false,

                    dialogOpen: false,
                    debugTab: "design" as IDebugTab,
                },
                (set) => ({
                    enable: (enabled: boolean) => set(() => ({ enabled })),
                    showStringKeys: (show: boolean) => set(() => ({ stringKeysVisible: show })),
                    enableReactQueryDevtools: (enabled: boolean) => set(() => ({ reactQueryDevtoolsEnabled: enabled })),

                    openDialog: () => set(() => ({ dialogOpen: true })),
                    closeDialog: () => set(() => ({ dialogOpen: false })),
                    setDialogOpen: (open: boolean) => set(() => ({ dialogOpen: open })),

                    setDebugTab: (tab: IDebugTab) => set(() => ({ debugTab: tab })),
                }),
            ),
            {
                name: "debug-store-storage",
                partialize: (state) => ({ enabled: state.enabled }),
            },
        ),
    ),
);

// Just an alias for use outside of React components
export const debugStore = useDebugStore;
