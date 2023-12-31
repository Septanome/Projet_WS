import React, { FC, useEffect } from "react";
import { Logo } from "../../components/logo/logo";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useParams } from "react-router-dom";
import { CharacterRequest } from "../../models/request/character-request";
import "./character-page.scss";
import { CharacterResult } from "../../models/request/search";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { CircularProgress, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import { ResourceTable } from "../../components/resource-table/resource-table";
import { CollapsedText } from "../../components/collapsed-text/collapsed-text";
import { useRequest } from "../../hooks/use-request";
import { BackToSearchBtn } from "../../components/back-to-search-btn/back-to-search-btn";

export const CharacterPage: FC = () => {
    const {
        setRequest,
        result: characterResult,
        isLoading,
        error,
    } = useRequest<CharacterResult>();

    const { characterName: encodedCharacterName } = useParams<{
        characterName: string;
    }>();

    useEffect(() => {
        setRequest(
            new CharacterRequest(
                decodeURIComponent(encodedCharacterName || ""),
            ),
        );
    }, [encodedCharacterName]);

    return (
        <div className="location-page has-results">
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
                {isLoading && <CircularProgress />}
                {error && <Typography color="danger">{error}</Typography>}

                {characterResult && (
                    <>
                        <BackToSearchBtn />
                        <Box sx={{ pt: 1, pb: 1 }}>
                            {characterResult?.thumbnail && (
                                <AspectRatio flex maxHeight={"200px"}>
                                    <img
                                        src={characterResult?.thumbnail.replace(
                                            "http://",
                                            "https://",
                                        )}
                                        srcSet={
                                            characterResult?.thumbnail.replace(
                                                "http://",
                                                "https://",
                                            ) + "2x"
                                        }
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
                            <Typography textColor="#fff" textAlign="justify">
                                <CollapsedText
                                    text={characterResult?.abstract ?? ""}
                                />
                            </Typography>
                        </Box>

                        <br />

                        <ResourceTable
                            resourceItems={[
                                {
                                    label: "Parents",
                                    value: characterResult?.parents ?? "",
                                    linkTo: "character",
                                },
                                {
                                    label: "Siblings",
                                    value: characterResult?.siblings ?? "",
                                    linkTo: "character",
                                },
                                {
                                    label: "Consorts",
                                    value: characterResult?.consort ?? "",
                                    linkTo: "character",
                                },
                                {
                                    label: "Children",
                                    value: characterResult?.children ?? "",
                                    linkTo: "character",
                                },
                                {
                                    label: "God of",
                                    value: characterResult?.godOf ?? "",
                                },
                                {
                                    label: "Abode",
                                    value: characterResult?.abode ?? "",
                                },
                                {
                                    label: "Symbol",
                                    value: characterResult?.symbol ?? "",
                                },
                            ]}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
