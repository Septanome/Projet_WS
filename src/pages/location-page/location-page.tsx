import React, { FC, useEffect } from "react";
import { Logo } from "../../components/logo/logo";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useParams } from "react-router-dom";
import { LocationRequest } from "../../models/request/location-request";
import "./location-page.scss";
import { LocationResult } from "../../models/request/search";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/joy";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import { ResourceTable } from "../../components/resource-table/resource-table";
import { CollapsedText } from "../../components/collapsed-text/collapsed-text";
import { useRequest } from "../../hooks/use-request";
import { BackToSearchBtn } from "../../components/back-to-search-btn/back-to-search-btn";

export const LocationPage: FC = () => {
    const {
        setRequest,
        result: locationResult,
        isLoading,
        error,
    } = useRequest<LocationResult>();

    const { locationName: encodedLocationName } = useParams<{
        locationName: string;
    }>();

    useEffect(() => {
        setRequest(
            new LocationRequest(decodeURIComponent(encodedLocationName || "")),
        );
    }, [encodedLocationName]);

    return (
        <div className="location-page has-results">
            <div className="top-section">
                <Logo />
                <SearchBar
                    value={
                        locationResult
                            ? locationResult.name || undefined
                            : undefined
                    }
                    allowClear
                />
            </div>

            <div className="bottom-section">
                {isLoading && <CircularProgress />}
                {error && <Typography color="danger">{error}</Typography>}

                {locationResult && (
                    <>
                        <BackToSearchBtn />
                        <Box sx={{ pt: 1, pb: 1 }}>
                            {locationResult?.thumbnail ? (
                                <AspectRatio flex maxHeight={"200px"}>
                                    <img
                                        src={locationResult?.thumbnail.replace(
                                            "http://",
                                            "https://",
                                        )}
                                        srcSet={
                                            locationResult?.thumbnail.replace(
                                                "http://",
                                                "https://",
                                            ) + "2x"
                                        }
                                    />
                                </AspectRatio>
                            ) : (
                                <AspectRatio flex maxHeight={"200px"}>
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/no_image.jpg"
                                        }
                                        srcSet={
                                            process.env.PUBLIC_URL +
                                            "/no_image.jpg 2x"
                                        }
                                        alt=""
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
                                    <LocationOnRoundedIcon
                                        sx={{ mr: 0.5, color: "#fff" }}
                                    />
                                    Location
                                </Typography>
                                <Typography textColor="#fff">
                                    {locationResult?.name ?? ""}
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            <Typography textColor="#fff" level="h1">
                                {locationResult?.label ?? ""}
                            </Typography>
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            {locationResult?.description && (
                                <>
                                    <Typography
                                        textColor="#fff"
                                        textAlign="justify"
                                    >
                                        <CollapsedText
                                            text={
                                                locationResult?.description ??
                                                ""
                                            }
                                        />
                                        {}
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <br />

                        <ResourceTable
                            resourceItems={[
                                {
                                    label: "Location",
                                    value:
                                        locationResult?.latitude +
                                        "°, " +
                                        locationResult?.longitude +
                                        "°",
                                },
                                {
                                    label: "Country",
                                    value: locationResult?.country ?? "",
                                },
                            ]}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
