import React, { FC, useEffect } from "react";

interface SearchResultsProps {
    search: string;
}
export const SearchResults: FC<SearchResultsProps> = ({ search }) => {
    return (
        <p>
            Searching for: <b>{search}</b>
        </p>
    );
};
