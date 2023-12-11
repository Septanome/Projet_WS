import { SearchRounded } from "@mui/icons-material";
import {
    Autocomplete,
    AutocompleteChangeReason,
    Button,
    CircularProgress,
} from "@mui/joy";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search-bar.scss";
import { AutocompleteResult } from "../../models/request/autocomplete";
import { AutocompleteRequest } from "../../models/request/autocomplete-request";
import { useDebounce } from "usehooks-ts";

interface SearchBarProps {
    value?: string;
    allowClear?: boolean;
    hideButton?: boolean;
    disabled?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
    value = "",
    allowClear = false,
    hideButton = false,
    disabled = false,
}) => {
    const [search, setSearch] = useState(value);
    const debouncedSearch = useDebounce(search, 500);
    const [autocomplete, setAutocomplete] = useState<AutocompleteResult[]>([]);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (search: string) => {
        navigate(
            search ? `/search?search=${encodeURIComponent(search)}` : "/search",
        );
    };

    const handleSelect = (item: AutocompleteResult) => {
        // TODO: navigate to actual item
        handleSearch(item.label);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleSearch(formData.get("search") as string);
    };

    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string | AutocompleteResult | null,
        reason: AutocompleteChangeReason,
    ) => {
        if (!value && !allowClear) return;

        let search: string | null = null;

        switch (typeof value) {
            case "string":
                handleSearch(value);
                break;
            case "object":
                if (!value) return;
                handleSelect(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!debouncedSearch) {
            setAutocomplete([]);
            return;
        }

        setAutocompleteLoading(true);
        new AutocompleteRequest(debouncedSearch)
            .execute()
            .then(setAutocomplete)
            .catch(console.error)
            .finally(() => setAutocompleteLoading(false));
    }, [debouncedSearch]);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        setSearch(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                placeholder="Search for this or that..."
                startDecorator={<SearchRounded />}
                endDecorator={
                    autocompleteLoading ? (
                        <CircularProgress color="neutral" size="sm" />
                    ) : (
                        <></>
                    )
                }
                options={autocomplete}
                freeSolo={true}
                blurOnSelect={true}
                onChange={handleChange}
                value={value}
                name="search"
                disabled={disabled}
                size="lg"
                onKeyUp={handleKeyUp}
            />
            {!hideButton && (
                <Button type="submit" size="lg" disabled={disabled}>
                    <SearchRounded />
                </Button>
            )}
        </form>
    );
};
