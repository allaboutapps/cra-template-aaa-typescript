import * as React from "react";
import Logo from "../../assets/images/logo.png";

export const ImageLogo = (props: { style?: React.CSSProperties }) => <img alt="Logo" src={Logo} style={props.style} />;
