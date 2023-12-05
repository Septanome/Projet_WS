import React, { FC, PropsWithChildren } from "react";
import { QueryContext } from "./context";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const query = async (query: string): Promise<any[]> => {
        return ["result 1", "result 2", "result 3"];
    };

    return (
        <QueryContext.Provider value={{ query }}>
            {children}
        </QueryContext.Provider>
    );
};
