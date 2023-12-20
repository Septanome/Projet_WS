import React, { FC, useCallback, useEffect } from "react";
import { Logo } from "../../components/logo/logo";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../contexts/search-context/context";
import "./search-page.scss";
import { CircularProgress, Typography } from "@mui/joy";
import { Pagination } from "../../components/pagination/pagination";
import { SearchResults } from "../../components/search-results/search-results";

export const SearchPage: FC = () => {
    const {
        searchQuery,
        searchResult,
        searchError,
        searchLoading,
        setSearchQuery,
        setSearchPage,
    } = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Get the search param from the URL and decode it
        setSearchPage(Number(searchParams.get("page") ?? 1));
        setSearchQuery(decodeURIComponent(searchParams.get("search") ?? ""));
    }, [searchParams]);

    const navigateToPage = useCallback(
        (page: number) => {
            setSearchParams((params) => {
                params.set("page", String(page));
                params.set("search", searchQuery ?? "");
                return params;
            });
        },
        [searchQuery],
    );

    const navigatePreviousPage = useCallback(() => {
        setSearchParams((params) => {
            const currentPage = Number(params.get("page") ?? 1);
            params.set("page", String(Math.max(1, currentPage - 1)));
            params.set("search", searchQuery ?? "");
            return params;
        });
    }, [searchQuery]);

    const navigateNextPage = useCallback(() => {
        setSearchParams((params) => {
            const currentPage = Number(params.get("page") ?? 1);
            params.set("page", String(currentPage + 1));
            params.set("search", searchQuery ?? "");
            return params;
        });
    }, [searchQuery]);

    return (
        <div className={"search-page" + (searchResult ? " has-results" : "")}>
            <div className="top-section">
                <Logo />
                <SearchBar
                    value={searchQuery ?? undefined}
                    disabled={searchLoading}
                    allowClear
                />
            </div>
            <div className="bottom-section">
                {searchError && (
                    <Typography color="danger">{searchError}</Typography>
                )}
                {searchLoading && <CircularProgress />}
                {!searchLoading && searchResult && (
                    <>
                        <SearchResults
                            search={searchQuery ?? ""}
                            results={searchResult.data}
                        />
                        <Pagination
                            pagination={searchResult}
                            disabled={searchLoading}
                            goToPage={navigateToPage}
                            goBack={navigatePreviousPage}
                            goForward={navigateNextPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
