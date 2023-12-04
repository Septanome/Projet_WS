import { Navigate, createBrowserRouter } from "react-router-dom";
import { SearchPage } from "../pages/search-page/search-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/search" />,
    },
    {
        path: "/search",
        element: <SearchPage />,
    }
]);