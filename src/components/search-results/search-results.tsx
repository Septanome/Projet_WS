import React, { FC, useEffect } from "react";
import CardComponent from "../card/card";
import { SearchResult } from "../../models/request/search";
import { Link } from "react-router-dom";
import Grid from "@mui/joy/Grid";
import "./search-results.scss";
import { CircularProgress, Typography } from "@mui/joy";
import { PaginatedData } from "../../models/pagination/pagination";

interface SearchResultsProps {
    search: string;
    results: PaginatedData<SearchResult>;
    loading: boolean;
}
export const SearchResults: FC<SearchResultsProps> = ({
    search,
    results,
    loading,
}) => {
    return (
        <div className="search-results">
            <div className="search-results__head">
                <Typography level="title-lg">
                    Search results for &quot;{search}&quot;
                </Typography>

                {loading ? (
                    <CircularProgress size="sm" />
                ) : (
                    <Typography>{results.total} results</Typography>
                )}
            </div>

            <div className="search-results__items">
                {results.data.map((result, index) => (
                    <CardComponent key={index} content={result} />
                ))}
            </div>
        </div>
    );
};
