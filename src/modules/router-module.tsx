import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { SearchPage } from "../pages/search-page/search-page";
import { CreditPage } from "../pages/credit-page/credit-page";

export const router = createBrowserRouter(
    [
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
    ],
    {
        basename: "/Projet_WS",
    },
);
