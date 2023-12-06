import React, { FC, useEffect } from "react";

interface SearchResultsProps {
    search: string;
    results: any[];
}
export const SearchResults: FC<SearchResultsProps> = ({ search, results }) => {
    return (
        <div>
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
