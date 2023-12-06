import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Footer: FC = () => {
    return (
        <footer>
            <span>{/* TITLE */}</span>
            <nav>
                <Link to="/credit">Credit</Link>
            </nav>
        </footer>
    );
};
