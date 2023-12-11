import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

export const Footer: FC = () => {
    return (
        <footer>
            <span>{/* TITLE */}</span>
            <nav>
                <Link to="/search">Search</Link>
                <Link to="/credit">Credit</Link>
                <Link to="https://github.com/Septanome/Projet_WS">Source Code</Link>
            </nav>
        </footer>
    );
};
