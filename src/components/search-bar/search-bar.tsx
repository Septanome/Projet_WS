import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, AutocompleteChangeReason, Button } from "@mui/joy";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./search-bar.scss";

const ITEMS = [
    { label: "Hamburger", id: 1 },
    { label: "Fries", id: 2 },
    { label: "Pizza", id: 3 },
    { label: "Pasta", id: 4 },
    { label: "Ice Cream", id: 5 },
    { label: "Sushi", id: 6 },
    { label: "Steak", id: 7 },
    { label: "Salad", id: 8 },
    { label: "Soup", id: 9 },
    { label: "Sandwich", id: 10 },
];

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
    const navigate = useNavigate();

    const handleSearch = (search: string) => {
        navigate(
            search ? `/search?search=${encodeURIComponent(search)}` : "/search",
        );
    };

    const handleSelect = (item: { label: string; id: number }) => {
        handleSearch(item.label);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleSearch(formData.get("search") as string);
    };

    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string | { label: string; id: number } | null,
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

    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                placeholder="Search for this or that..."
                startDecorator={<SearchRounded />}
                options={ITEMS}
                freeSolo={true}
                blurOnSelect={true}
                onChange={handleChange}
                value={value}
                name="search"
                disabled={disabled}
            />
            {!hideButton && (
                <Button type="submit" disabled={disabled}>
                    Search
                </Button>
            )}
        </form>
    );
};
