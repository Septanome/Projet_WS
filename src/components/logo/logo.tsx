import Grid from "@mui/joy/Grid";
import React, { FC } from "react";
import "./logo.scss";
import { Link } from "react-router-dom";

export const Logo: FC = () => {
    return (
        <Link to="/">
            <Grid container justifyContent="center">
                <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    className="logo"
                    alt="logo"
                />
            </Grid>
        </Link>
    );
};
