import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, AutocompleteChangeReason, FormControl } from "@mui/joy";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

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
}

export const SearchBar: FC<SearchBarProps> = ({ value = '', allowClear = false }) => {
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string | { label: string, id: number } | null, reason: AutocompleteChangeReason) => {
        if (!value && !allowClear) return;
        
        let search: string;

        switch (typeof value) {
            case "string":
                search = value;
                break;
            case "object":
                search = value?.label ?? '';
                break;
            default:
                return;
        }

        navigate(search ? `/search?search=${encodeURIComponent(search)}` : '/search');
    }

    return (
        <FormControl>
            <Autocomplete
                placeholder="Search for this or that..."
                startDecorator={<SearchRounded />}
                options={ITEMS}
                freeSolo={true}
                blurOnSelect={true}
                onChange={handleChange}
                value={value}
            />
        </FormControl>
    );
}