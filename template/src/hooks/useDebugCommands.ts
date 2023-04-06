import { useDebugStore } from "../stores/debugStore";

// Hook that binds various debug commands to the window object
// Only use this in your top-level component e.g. App.tsx
export function useDebugCommands() {
    // We don't need stringKeysVisible but have to pull it in to trigger a re-render
    useDebugStore((state) => state.stringKeysVisible);
    const showStringKeys = useDebugStore((state) => state.showStringKeys);
    const enableDebug = useDebugStore((state) => state.enable);

    // Bind debug commands to window object
    // Use syntax debugXyz() when adding new commands
    (window as any).debugShowStringKeys = showStringKeys;
    (window as any).debugEnable = enableDebug;
}
