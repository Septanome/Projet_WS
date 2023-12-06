import React, { FC, useEffect } from "react";
import { SearchBar } from "../../components/search-bar/search-bar";
import { SearchResults } from "../../components/search-results/search-results";
import { useSearchParams } from "react-router-dom";
import "./search-page.scss";

export const SearchPage: FC = () => {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = React.useState<string>("");

    useEffect(() => {
        setSearch(decodeURIComponent(searchParams.get("search") ?? ""));
    }, [searchParams]);

    return (
        <div className="search-page">
            <SearchBar value={search} allowClear />
            <SearchResults search={search} />
        </div>
    );
};
