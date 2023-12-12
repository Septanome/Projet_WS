import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

export const Footer: FC = () => {
    return (
        <footer>
            <span>{/* TITLE */}</span>
            <nav>
                <div className="internal-links">
                    <Link to="/search">Search</Link>
                    <Link to="/credit">Credit</Link>
                </div>
                <div className="external-links">
                    <Link to="https://github.com/Septanome/Projet_WS">
                        <img src="github_logo.png"></img>
                    </Link>
                </div>
            </nav>
        </footer>
    );
};
