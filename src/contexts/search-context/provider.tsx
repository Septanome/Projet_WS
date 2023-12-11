import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { SearchContext } from "./context";
import { PaginatedData } from "../../models/pagination/pagination";
import { SearchResult } from "../../models/request/search";
import { SearchRequest } from "../../models/request/search-request";

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [searchLimit, setSearchLimit] = useState<number>(10);
    const [searchOffset, setSearchOffset] = useState<number>(0);
    const [searchResult, setSearchResult] =
        useState<PaginatedData<SearchResult> | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);

    useEffect(() => {
        setSearchError(null);

        if (!searchQuery) {
            setSearchResult(null);
            return;
        }

        setSearchLoading(true);

        new SearchRequest(searchQuery, searchOffset, searchLimit)
            .execute()
            .then((results) => {
                setSearchResult(results);
            })
            .catch((error) => {
                setSearchError(String(error));
                console.error(error);
                setSearchResult(null);
            })
            .finally(() => {
                setSearchLoading(false);
            });
    }, [searchQuery, searchLimit, searchOffset]);

    const setSearchPage = (page: number) => {
        setSearchOffset((page - 1) * searchLimit);
    };

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                searchLimit,
                searchOffset,
                searchResult,
                searchError,
                searchLoading,
                setSearchQuery,
                setSearchPage,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
