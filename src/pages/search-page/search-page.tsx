import React, { FC, useEffect } from "react";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useSearchParams } from "react-router-dom";
import "./search-page.scss";
import { useQuery } from "../../contexts/query-context/context";
import { Typography } from "@mui/joy";

export const SearchPage: FC = () => {
    const { query } = useQuery();
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
        query(`MY QUERY: ${search}`)
            .then((results) => setResults(results))
            .catch((error) => {
                setError(String(error));
                console.error(error);
                setResults([]);
            });
    }, [search]);

    return (
        <div className="search-page">
            <SearchBar value={search} allowClear />
            {error && <Typography color="danger">{error}</Typography>}

            <p>
                Searching for: <b>{search}</b>
            </p>

            <ul>
                {results.map((result, i) => (
                    <li key={i}>{result}</li>
                ))}
            </ul>
        </div>
    );
};
