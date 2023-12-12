import React from "react";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import "./app.scss";
import { AppProvider } from "../modules/app-provider";

export const App: FC = () => {
    return (
        <AppProvider>
            <div className="app">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
            <div className="app-background"></div>
        </AppProvider>
    );
};
