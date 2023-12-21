import { Link } from "@mui/joy";
import React, { FC, useCallback } from "react";

const DEFAULT_MAX_LENGTH = 250;
const DEFAULT_LENGTH_BUFFER = 50;

interface CollapsedTextProps {
    text: string;
    maxLength?: number;
    lengthBuffer?: number;
}

export const CollapsedText: FC<CollapsedTextProps> = ({
    text,
    maxLength = DEFAULT_MAX_LENGTH,
    lengthBuffer = DEFAULT_LENGTH_BUFFER,
}) => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

    const toggleAbstract = () => setIsCollapsed((prev) => !prev);

    return text.length <= maxLength + lengthBuffer ? (
        <>{text}</>
    ) : isCollapsed ? (
        <>
            {text.substring(0, maxLength) + "... "}
            <Link onClick={toggleAbstract}>Read More</Link>
        </>
    ) : (
        <>
            {text} <Link onClick={toggleAbstract}>Read less</Link>
        </>
    );
};
