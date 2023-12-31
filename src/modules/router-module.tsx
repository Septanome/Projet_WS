import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { SearchPage } from "../pages/search-page/search-page";
import { CreditPage } from "../pages/credit-page/credit-page";
import { LocationPage } from "../pages/location-page/location-page";
import { CharacterPage } from "../pages/character-page/character-page";
import { App } from "../app/app";

export const router = createBrowserRouter(
    [
        {
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Navigate to="/search" />,
                },
                {
                    path: "/search",
                    element: <SearchPage />,
                },
                {
                    path: "/credit",
                    element: <CreditPage />,
                },
                {
                    path: "/location/:locationName",
                    element: <LocationPage />,
                },
                {
                    path: "/character/:characterName",
                    element: <CharacterPage />,
                },
                {
                    path: "*",
                    element: <Navigate to="/search" />,
                },
            ],
        },
    ],
    {
        basename: "/Projet_WS",
    },
);
