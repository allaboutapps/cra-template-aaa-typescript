export function DebugBox(props: { children: React.ReactNode }) {
    return (
        <div
            style={{
                marginTop: 40,
            }}
        >
            {props.children}
        </div>
    );
}
