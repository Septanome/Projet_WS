import React, { FC, useEffect, useState } from "react";
import { Logo } from "../../components/logo/logo";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useParams } from "react-router-dom";
import { CharacterRequest } from "../../models/request/character-request";
import "./character-page.scss";
import { CharacterResult } from "../../models/request/search";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import HelpIcon from "@mui/icons-material/Help";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";

export const CharacterPage: FC = () => {
    const [characterResult, setCharacterResult] = useState<CharacterResult>();
    const [searchError, setSearchError] = useState<string | null>(null);

    const { characterName: encodedCharacterName } = useParams<{
        characterName: string;
    }>();

    useEffect(() => {
        const characterName = decodeURIComponent(encodedCharacterName || "");

        const characterRequest = new CharacterRequest(characterName);

        characterRequest
            .execute()
            .then((results) => {
                setCharacterResult(results);
            })
            .catch((error) => {
                setSearchError(String(error));
                console.error(error);
                setCharacterResult(undefined);
            });
    }, []);

    return (
        <div className="location-page">
            <div className="top-section">
                <Logo />
                <SearchBar
                    value={
                        characterResult
                            ? characterResult.label || undefined
                            : undefined
                    }
                    allowClear
                />
            </div>

            <div className="bottom-section">
                {characterResult && (
                    <>
                        <Box sx={{ pt: 1, pb: 1 }}>
                            {characterResult?.thumbnail && (
                                <AspectRatio flex maxHeight={"200px"}>
                                    <img
                                        src={characterResult?.thumbnail}
                                        srcSet={
                                            characterResult?.thumbnail + "2x"
                                        }
                                        alt="A beautiful landscape."
                                    />
                                </AspectRatio>
                            )}
                        </Box>

                        <Box>
                            <Breadcrumbs
                                separator="›"
                                aria-label="breadcrumbs"
                                sx={{ color: "#fff" }}
                            >
                                <Link
                                    to={"/"}
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Search
                                </Link>
                                <Typography textColor="#fff">
                                    <PersonIcon
                                        sx={{ mr: 0.5, color: "#fff" }}
                                    />
                                    Character
                                </Typography>
                                <Typography textColor="#fff">
                                    {characterResult?.label ?? ""}
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            <Typography textColor="#fff" level="h1">
                                {characterResult?.label ?? ""}
                            </Typography>
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            {characterResult?.parents && (
                                <Typography textColor="#fff" level="h4">
                                    Parents: {characterResult?.parents ?? ""}
                                </Typography>
                            )}

                            {characterResult?.siblings && (
                                <Typography textColor="#fff" level="h4">
                                    Siblings: {characterResult?.siblings ?? ""}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            <Typography textColor="#fff" textAlign="justify">
                                {characterResult?.abstract ?? ""}
                            </Typography>
                        </Box>
                    </>
                )}
            </div>
        </div>
    );
};
