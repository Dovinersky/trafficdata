import "@/styles/components/Tooltip.scss";
import { joinClasses } from "@/utils/classesJoiner";
import React from "react";

type TooltipProps = {
    className?: string;
    tooltip: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children?: React.ReactNode;
    inactive?: boolean;
};

const Tooltip = ({
    className,
    tooltip,
    position = "bottom",
    children,
    inactive,
}: TooltipProps) => {
    return (
        <span
            className={joinClasses(
                "tooltip",
                `tooltip-${position}`,
                inactive ? "inactive" : "",
                className
            )}
            data-tooltip={tooltip}
        >
            {children}
        </span>
    );
};

export default Tooltip;
