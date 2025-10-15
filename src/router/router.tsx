import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import RootLayout from "../pages/Home/layout";
import Plastic from "../pages/Plastic/Plastic";
import PlasticLayout from "../pages/Plastic/layout";
import { Antiage } from "../pages/antiage/Antiage";
import AntiageLayout from "../pages/antiage/layout";
import { Cosmetology } from "../pages/cosmetology/Cosmetology";
import CosmetologyLayout from "../pages/cosmetology/layout";
import { Doctor } from "../pages/doctor/Doctor";
import DoctorLayout from "../pages/doctor/layout";
import Reabilitation from "../pages/Reabilitation/Reabilitation";
import ReabilitationLayout from "../pages/Reabilitation/layout";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsLayout from "../pages/Doctors/layout";



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: "/plastic",
        element: <PlasticLayout />,
        children: [
            {
                index: true,
                element: <Plastic />,
            },
        ],
    },
    {
        path: "/cosmetology",
        element: <CosmetologyLayout />,
        children: [
            {
                index: true,
                element: <Cosmetology />,
            },
        ],
    },
    {
        path: "/anti-age",
        element: <AntiageLayout />,
        children: [
            {
                index: true,
                element: <Antiage />,
            },
        ],
    },
    {
        path: "/doctor",
        element: <DoctorLayout />,
        children: [
            {
                index: true,
                element: <Doctor />,
            },
        ],
    },
    {
        path: "/reabilitation",
        element: <ReabilitationLayout />,
        children: [
            {
                index: true,
                element: <Reabilitation />,
            },
        ],
    },
    {
        path: "/doctors",
        element: <DoctorsLayout />,
        children: [
            {
                index: true,
                element: <Doctors />,
            },
        ],
    },
]);

export default router;
