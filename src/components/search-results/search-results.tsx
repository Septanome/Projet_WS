import React, { FC, useEffect } from "react";
import CardComponent from "../card/card";
import { SearchResult } from "../../models/request/search";
import { Link } from "react-router-dom";
import Grid from "@mui/joy/Grid";

interface SearchResultsProps {
    search: string;
    results: SearchResult[];
}
export const SearchResults: FC<SearchResultsProps> = ({ search, results }) => {
    return (
        <Grid container spacing={4}>
            <Grid xs={12}>
                <h1>Search results for &quot;{search}&quot;</h1>
            </Grid>

            {results.map((result, index) => (
                <Grid key={index} xs={6} md={3}>
                    <Link
                        to={`/${result.type}/${encodeURIComponent(
                            result.uriPart,
                        )}`}
                        key={result.url}
                    >
                        <CardComponent content={result} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};
