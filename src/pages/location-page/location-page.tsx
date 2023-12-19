import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationRequest } from "../../models/request/location-request";
import "./location-page.scss";
import { LocationResult } from "../../models/request/search";

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
            {locationResult && (
                <>
                    {locationResult.thumbnail}
                    {locationResult.description}
                    {locationResult.label}
                    {locationResult.latitude}
                    {locationResult.longitude}
                    {locationResult.name}
                    {locationResult.country}
                </>
            )}
        </div>
    );
};
