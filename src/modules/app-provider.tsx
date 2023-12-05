import React, { FC, PropsWithChildren } from "react";
import { StyleProvider } from "./style-provider";
import { QueryProvider } from "../contexts/query-context/provider";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <StyleProvider>
            <QueryProvider>{children}</QueryProvider>
        </StyleProvider>
    );
};
