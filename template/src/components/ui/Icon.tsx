import { styled } from "@mui/material";
import * as React from "react";

type IIconNames = "close";

const icons: { [k in IIconNames]: { path: React.ReactNode; fileName: string } } = {
    close: {
        fileName: "ic_close.svg",
        path: (
            // ic_close.svg
            <g fill="none">
                <path
                    d="M8.46451 7.05026L7.05029 8.46448L10.5858 12L7.05029 15.5355L8.46451 16.9498L12 13.4142L15.5356 16.9498L16.9498 15.5355L13.4143 12L16.9498 8.46448L15.5356 7.05026L12 10.5858L8.46451 7.05026Z"
                    fill="#4F4F4F"
                />
            </g>
        ),
    },
};

type IContainerProps = {
    color?: string;
    strokeColor?: string;
    hoverColor?: string;
    onClick?: any;
    disabled?: boolean;
    useCurrentColor?: boolean;
};

const BlockContainer = styled("div", {
    shouldForwardProp: (prop: string) => prop !== "useCurrentColor" && prop !== "hoverColor",
})(({ disabled, onClick, hoverColor, color, useCurrentColor }: IContainerProps) => ({
    userSelect: "none",
    cursor: disabled || !onClick ? undefined : "pointer",

    "& > svg": {
        display: "block",
    },

    "& > svg *[fill]:not([fill=none])": {
        transition: hoverColor ? "fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" : undefined,
        fill: useCurrentColor ? "currentColor" : color,
    },

    "&: hover > svg *[fill]:not([fill=none])": {
        fill: hoverColor,
    },

    "&: hover > svg *[stroke]:not([stroke=none])": {
        stroke: hoverColor,
    },

    "& > svg *[stroke]:not([stroke=none])": {
        transition: hoverColor ? "stroke 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" : undefined,
        stroke: useCurrentColor ? "currentColor" : color,
    },
}));

const InlineBlockContainer = styled(BlockContainer)({
    display: "inline-block",
    lineHeight: 0,
    verticalAlign: "bottom",
    "& > svg": {
        display: "inline-block",
    },
});

type IIconMap = {
    [name: string]: {
        viewBoxSize?: number;
        path: React.ReactNode;
    };
};

export type IconNames = keyof typeof icons;

export type IProps = {
    name: IconNames;
    title?: string;
    onClick?: any;
    disabled?: boolean;
    color?: string;
    hoverColor?: string;
    useCurrentColor?: boolean;
    size?: string | number;
    style?: React.CSSProperties;
    className?: string;
    display?: "block" | "inline-block";
    "data-id"?: string;
};
export const Icon = ({
    name,
    title,
    onClick,
    disabled,
    color,
    hoverColor,
    useCurrentColor,
    size = 24,
    style,
    className,
    "data-id": dataId,
    display = "inline-block",
}: IProps) => {
    const Container = display === "block" ? BlockContainer : InlineBlockContainer;
    const viewBoxSize = (icons as IIconMap)[name].viewBoxSize || 24;
    return (
        <Container
            data-id={dataId}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            color={disabled ? "#A1A1A1" : color}
            // the props have to be lowercase to appear on DOM
            hoverColor={disabled ? undefined : hoverColor}
            useCurrentColor={disabled ? undefined : useCurrentColor}
            className={className}
            style={style}
        >
            <svg
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
            >
                {title && <title>{title}</title>}
                {icons[name].path}
            </svg>
        </Container>
    );
};