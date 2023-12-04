import React, { FC, useEffect } from "react";
import { SearchBar } from "../../components/search-bar/search-bar";
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

            <p>
                Searching for: <b>{search}</b>
            </p>
        </div>
    );
};
