import { createBrowserRouter } from "react-router-dom";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsLayout from "../pages/Doctors/layout";
import Home from "../pages/Home/Home";
import RootLayout from "../pages/Home/layout";
import Plastic from "../pages/Plastic/Plastic";
import PlasticLayout from "../pages/Plastic/layout";
import Reabilitation from "../pages/Reabilitation/Reabilitation";
import ReabilitationLayout from "../pages/Reabilitation/layout";
import { Antiage } from "../pages/antiage/Antiage";
import AntiageLayout from "../pages/antiage/layout";
import { ApartmentsNew } from "../pages/apartments-new/ApartmentsNew";
import ApartmentsNewLayout from "../pages/apartments-new/layout";
import { Contact } from "../pages/contact/Contact";
import ContactLayout from "../pages/contact/layout";
import { Cookie } from "../pages/cookie/Cookie";
import CookieLayout from "../pages/cookie/layout";
import { Cosmetology } from "../pages/cosmetology/Cosmetology";
import CosmetologyLayout from "../pages/cosmetology/layout";
import { Doctor } from "../pages/doctor/Doctor";
import DoctorLayout from "../pages/doctor/layout";
import Documents from "../pages/documents/Documents";
import DocumentsLayout from "../pages/documents/layout";
import GettingReady from "../pages/getting-ready/GettingReady";
import GettingReadyLayout from "../pages/getting-ready/layout";
import { News } from "../pages/news/News";
import NewsLayout from "../pages/news/layout";
import { OperationRooms } from "../pages/operation-rooms/OperationRooms";
import OperationRoomsLayout from "../pages/operation-rooms/layout";
import { PatientInfo } from "../pages/patient-info/PatientInfo";
import PatientInfoLayout from "../pages/patient-info/layout";
import { Patient } from "../pages/patient/Patient";
import PatientLayout from "../pages/patient/layout";
import { UserAgreement } from "../pages/poljzovateljskoe-soglashenie-ob-ispoljzovanii-sajta/UserAgreement";
import UserAgreementLayout from "../pages/poljzovateljskoe-soglashenie-ob-ispoljzovanii-sajta/layout";
import Prices from "../pages/prices/Prices";
import PricesLayout from "../pages/prices/layout";
import { PrivacyPolicy } from "../pages/privacy-policy/PrivacyPolicy";
import PrivacyPolicyLayout from "../pages/privacy-policy/layout";
import { Safety } from "../pages/safety/Safety";
import SafetyLayout from "../pages/safety/layout";
import { About } from "../pages/about/About";
import AboutLayout from "../pages/about/layout";
import TourismLayout from "../pages/tourism/layout";
import { Tourism } from '../pages/tourism/Tourism'

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
        path: "/doctor/:id",
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
    {
        path: "/safety",
        element: <SafetyLayout />,
        children: [
            {
                index: true,
                element: <Safety />,
            },
        ],
    },
    // {
    //     path: "/apartments",
    //     element: <ApartmentsLayout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Apartments />,
    //         },
    //     ],
    // },
    {
        path: "/apartments",
        element: <ApartmentsNewLayout />,
        children: [
            {
                index: true,
                element: <ApartmentsNew />,
            },
        ],
    },
    {
        path: "/operation-rooms",
        element: <OperationRoomsLayout />,
        children: [
            {
                index: true,
                element: <OperationRooms />,
            },
        ],
    },
    {
        path: "/contacts",
        element: <ContactLayout />,
        children: [
            {
                index: true,
                element: <Contact />,
            },
        ],
    },
    {
        path: "/privacy-policy",
        element: <PrivacyPolicyLayout />,
        children: [
            {
                index: true,
                element: <PrivacyPolicy />,
            },
        ],
    },
    {
        path: "/getting-ready",
        element: <GettingReadyLayout />,
        children: [
            {
                index: true,
                element: <GettingReady />,
            },
        ],
    },
    {
        path: "/prices",
        element: <PricesLayout />,
        children: [
            {
                index: true,
                element: <Prices />,
            },
        ],
    },
    {
        path: "/documents",
        element: <DocumentsLayout />,
        children: [
            {
                index: true,
                element: <Documents />,
            },
        ],
    },
    {
        path: "/patient",
        element: <PatientLayout />,
        children: [
            {
                index: true,
                element: <Patient />,
            },
        ],
    },
    {
        path: "/patient/:id",
        element: <PatientInfoLayout />,
        children: [
            {
                index: true,
                element: <PatientInfo />,
            },
        ],
    },
    {
        path: "/news",
        element: <NewsLayout />,
        children: [
            {
                index: true,
                element: <News />,
            },
        ],
    },
    {
        path: "/about",
        element: <AboutLayout />,
        children: [
            {
                index: true,
                element: <About />,
            },
        ],
    },
    {
        path: "/tourism",
        element: <TourismLayout />,
        children: [
            {
                index: true,
                element: <Tourism />,
            },
        ],
    },
    {
        path: "/cookie",
        element: <CookieLayout />,
        children: [
            {
                index: true,
                element: <Cookie />,
            },
        ],
    },
    {
        path: "/poljzovateljskoe-soglashenie-ob-ispoljzovanii-sajta",
        element: <UserAgreementLayout />,
        children: [
            {
                index: true,
                element: <UserAgreement />,
            },
        ],
    },
]);

export default router;
