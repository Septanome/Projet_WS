import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { PaginatedData } from "../../models/pagination/pagination";
import { SearchResult } from "../../models/request/search";

interface ISearchContext {
    searchQuery: string | null;
    searchLimit: number;
    searchOffset: number;
    searchResult: PaginatedData<SearchResult> | null;
    searchError: string | null;
    searchLoading: boolean;

    setSearchQuery: Dispatch<SetStateAction<string | null>>;
    setSearchPage: (page: number) => void;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }

    return context;
};

export { SearchContext, useSearch };
