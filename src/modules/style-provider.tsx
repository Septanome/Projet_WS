import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import React, { FC, PropsWithChildren } from "react";

const theme = extendTheme({});

export const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <CssVarsProvider theme={theme} disableNestedContext>
            <CssBaseline />
            {children}
        </CssVarsProvider>
    );
};
