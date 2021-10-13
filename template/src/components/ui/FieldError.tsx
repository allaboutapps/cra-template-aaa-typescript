import * as React from "react";

type FieldErrorProps = {
    children?: string;
};

export const FieldError = ({ children }: FieldErrorProps) => (
    <span
        style={{
            color: "#d32f2f",
            display: "block",
            minHeight: 18,
            width: "100%",
            marginTop: 4,
            marginBottom: 10,
            fontSize: 12,
        }}
    >
        {children}
    </span>
);
