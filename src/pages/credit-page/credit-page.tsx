import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "./credit-page.scss";

export const CreditPage: FC = () => {
    return (
        <div className="credit-page">
            <p>Credit</p>

            <ul>
                <li>
                    Clement -
                    <Link to="https://github.com/clemgi0">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Irvin -
                    <Link to="https://github.com/i-cote">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Widad -
                    <Link to="https://github.com/widad17">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Charles -
                    <Link to="https://github.com/cfstcyr">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Josué -
                    <Link to="https://github.com/josue-venegas-almonacid">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Hichem -
                    <Link to="https://github.com/jini0x">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
                <li>
                    Daniel -
                    <Link to="https://github.com/LordVERTON">
                        <img src="github_logo.png"></img>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
