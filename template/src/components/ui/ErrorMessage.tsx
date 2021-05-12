import * as React from "react";

function ErrorMessage(props: { children: React.ReactNode }) {
    return (
        <div
            style={{
                background: "rgb(255, 0, 0, .1)",
                color: "#f00",
                borderRadius: 4,
                marginTop: 24,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 13,
                padding: "8px 14px",
            }}
        >
            {props.children}
        </div>
    );
}

export { ErrorMessage };
