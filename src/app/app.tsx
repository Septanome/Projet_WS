import React from "react";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../modules/router-module";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import "./app.scss";

export const App: FC = () => {
    return (
        <div className="app">
            <Header />
            <RouterProvider router={router} />
            <Footer />
        </div>
    );
};
