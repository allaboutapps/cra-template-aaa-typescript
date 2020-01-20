import * as React from "react";

export const ImageLogo = (props: { style?: React.CSSProperties }) => (
    <img alt="Logo" src={require("../../assets/images/logo.png")} style={props.style} />
);
