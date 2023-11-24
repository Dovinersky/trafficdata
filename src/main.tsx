import MainLayout from "@/layouts/MainLayout";
import Dashboards from "@/pages/Dashboards";
import Error from "@/pages/Error";
import Events from "@/pages/Events";
import Home from "@/pages/Home";
import Tables from "@/pages/Tables";
import "@/styles/defaults.scss";
import "@/styles/globals.scss";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import generateData from "./utils/dataGenerator";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: "/events", element: <Events /> },
            { path: "/dashboards", element: <Dashboards /> },
            { path: "/tables", element: <Tables /> },
        ],
        errorElement: (
            <MainLayout>
                <Error />
            </MainLayout>
        ),
    },
]);

const data = generateData();
export const DataContext = createContext(data);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <DataContext.Provider value={data}>
        <RouterProvider router={router} />
    </DataContext.Provider>
    // </React.StrictMode>
);
