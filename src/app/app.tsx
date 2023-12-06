import React from "react";
import { FC } from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "../modules/router-module";
import { Header } from "../components/header/header";
import "./app.scss";
import { AppProvider } from "../modules/app-provider";

export const App: FC = () => {
    return (
        <AppProvider>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </AppProvider>
    );
};
