import { createContext, useContext } from "react";

interface IQueryContext {
    query: (query: string) => Promise<any[]>;
}

const QueryContext = createContext<IQueryContext>({
    query: () => Promise.resolve([]),
});

const useQuery = () => {
    const context = useContext(QueryContext);

    if (!context) {
        throw new Error("useQuery must be used within a QueryProvider");
    }

    return context;
};

export { QueryContext, useQuery };
