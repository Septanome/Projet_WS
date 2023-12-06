import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "./credit-page.scss";

export const CreditPage: FC = () => {
    return (
        <div className="credit-page">
            <p>Credit</p>

            <ul>
                <li>
                    Clement - <Link to="https://github.com/clemgi0">clemgi0</Link>
                </li>
                <li>
                    Irvin - <Link to="https://github.com/i-cote">i-cote</Link>
                </li>
                <li>
                    Widad - <Link to="https://github.com/widad17">widad17</Link>
                </li>
                <li>
                    Charles - <Link to="https://github.com/cfstcyr">cfstcyr</Link>
                </li>
                <li>
                    Josué - <Link to="https://github.com/josue-venegas-almonacid">josue-venegas-almonacid</Link>
                </li>
                <li>
                    Hichem - <Link to="https://github.com/jini0x">jini0x</Link>
                </li>
                <li>
                    Daniel - <Link to="https://github.com/LordVERTON">LordVERTON</Link>
                </li>
            </ul>
        </div>
    );
};
