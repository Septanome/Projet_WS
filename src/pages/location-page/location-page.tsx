import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationRequest } from "../../models/request/location-request";
import "./location-page.scss";

interface LocationPageParams {
    locationName: string;
}

export const LocationPage: FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>();

    const { locationName: encodedLocationName } = useParams<{
        locationName: string;
    }>();

    useEffect(() => {
        const locationName = decodeURIComponent(encodedLocationName || "");

        const locationRequest = new LocationRequest(locationName);

        setSearchQuery(locationRequest.buildSearchQuery(locationName));
    }, [encodedLocationName]);

    return (
        <div className="location-page">
            <p>Location: {locationName}</p>
        </div>
    );
};
