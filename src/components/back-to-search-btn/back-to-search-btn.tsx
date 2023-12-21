import { ArrowLeftRounded } from "@mui/icons-material";
import { Button } from "@mui/joy";
import React, { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const BackToSearchBtn: FC = () => {
    const [searchParams] = useSearchParams();

    return (
        <Link
            to={`/search?search=${searchParams.get(
                "queryRef",
            )}&page=${searchParams.get("pageRef")}`}
        >
            <Button>
                <ArrowLeftRounded /> Back to search
            </Button>
        </Link>
    );
};
