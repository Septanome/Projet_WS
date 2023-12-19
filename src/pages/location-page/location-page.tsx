import React, { FC, useEffect, useState } from "react";
import { Logo } from "../../components/logo/logo";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useParams } from "react-router-dom";
import { LocationRequest } from "../../models/request/location-request";
import "./location-page.scss";
import { LocationResult } from "../../models/request/search";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link } from "react-router-dom";
import { Typography } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import HelpIcon from "@mui/icons-material/Help";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";

export const LocationPage: FC = () => {
    const [locationResult, setLocationResult] = useState<LocationResult>();
    const { locationName: encodedLocationName } = useParams<{
        locationName: string;
    }>();

    useEffect(() => {
        const locationName = decodeURIComponent(encodedLocationName || "");
        const locationRequest = new LocationRequest(locationName);

        locationRequest.execute().then((results) => {
            setLocationResult(results);
        });
    }, []);

    return (
        <div className="location-page">
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
                {locationResult && (
                    <>
                        <Box sx={{ pt: 1, pb: 1 }}>
                            {locationResult?.thumbnail && (
                                <AspectRatio flex maxHeight={"200px"}>
                                    <img
                                        src={locationResult?.thumbnail}
                                        srcSet={
                                            locationResult?.thumbnail + "2x"
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
                                {locationResult?.name ?? ""}
                            </Typography>
                            <Typography textColor="#fff" level="h2">
                                {locationResult?.label ?? ""}
                            </Typography>

                            {locationResult?.latitude &&
                                locationResult?.longitude && (
                                    <Typography textColor="#fff" level="h4">
                                        {locationResult?.latitude ?? ""}° -{" "}
                                        {locationResult?.longitude ?? ""}°
                                    </Typography>
                                )}
                        </Box>

                        <Box sx={{ pt: 1, pb: 1 }}>
                            <Typography textColor="#fff" textAlign="justify">
                                {locationResult?.description ?? ""}
                            </Typography>
                        </Box>
                    </>
                )}
            </div>
        </div>
    );
};
