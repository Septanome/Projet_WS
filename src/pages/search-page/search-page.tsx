import React, { FC, useEffect } from "react";
import { SearchBar } from "../../components/search-bar/search-bar";
import { SearchResults } from "../../components/search-results/search-results";
import { useSearchParams } from "react-router-dom";
import "./search-page.scss";
import { useQuery } from "../../contexts/query-context/context";
import { Typography } from "@mui/joy";

export const SearchPage: FC = () => {
    const { queryAllTypes } = useQuery();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = React.useState<string>("");
    const [results, setResults] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        // Get the search param from the URL and decode it
        setSearch(decodeURIComponent(searchParams.get("search") ?? ""));
    }, [searchParams]);

    useEffect(() => {
        setError(null);

        if (!search) {
            setResults([]);
            return;
        }

        // Execute the query and set the results
        queryAllTypes(search)
            .then((results) => {
                setResults(results);
                setError(null);
            })
            .catch((error) => {
                setError(String(error));
                console.error(error);
                setResults([]);
            });
    }, [search]);

    return (
        <div className="search-page">
            <SearchBar value={search} allowClear />
            <SearchResults search={search} results={results} />
            {error && <Typography color="danger">{error}</Typography>}
        </div>
    );
};
