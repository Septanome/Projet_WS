import Grid from '@mui/joy/Grid';
import React, { FC } from "react";
import "./logo.scss";

export const Logo: FC = () => {
    return (
        <Grid container justifyContent="center">
            <img src="logo.png" className="logo" alt="logo" />
        </Grid>
    );
};
