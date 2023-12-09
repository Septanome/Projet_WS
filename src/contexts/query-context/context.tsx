import { createContext, useContext } from "react";

export enum ResourceType {
    CHARACTER = "character",
    LOCATION = "location",
    OBJECT = "object",
}

interface IQueryContext {
    query: (query: string, type: ResourceType) => Promise<any[]>;
    queryAllTypes: (query: string) => Promise<any[]>;
}

const QueryContext = createContext<IQueryContext>({
    query: () => Promise.resolve([]),
    queryAllTypes: () => Promise.resolve([]),
});

const useQuery = () => {
    const context = useContext(QueryContext);

    if (!context) {
        throw new Error("useQuery must be used within a QueryProvider");
    }

    return context;
};

export { QueryContext, useQuery };
