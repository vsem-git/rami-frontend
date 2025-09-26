import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Home/layout";
import Home from "../pages/Home/Home";
import Plastic from "../pages/Plastic/Plastic";
import PlasticLayout from "../pages/Plastic/layout";
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
]);

export default router;
