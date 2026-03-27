import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const RootLayout = lazy(() => import("../pages/Home/layout"));
const Home = lazy(() => import("../pages/Home/Home"));

const PlasticLayout = lazy(() => import("../pages/Plastic/layout"));
const Plastic = lazy(() => import("../pages/Plastic/Plastic"));

const CosmetologyLayout = lazy(() => import("../pages/cosmetology/layout"));
const Cosmetology = lazy(() => import("../pages/cosmetology/Cosmetology").then(m => ({ default: m.Cosmetology })));

const AntiageLayout = lazy(() => import("../pages/antiage/layout"));
const Antiage = lazy(() => import("../pages/antiage/Antiage").then(m => ({ default: m.Antiage })));

const DoctorLayout = lazy(() => import("../pages/doctor/layout"));
const Doctor = lazy(() => import("../pages/doctor/Doctor").then(m => ({ default: m.Doctor })));

const ReabilitationLayout = lazy(() => import("../pages/Reabilitation/layout"));
const Reabilitation = lazy(() => import("../pages/Reabilitation/Reabilitation"));

const DoctorsLayout = lazy(() => import("../pages/Doctors/layout"));
const Doctors = lazy(() => import("../pages/Doctors/Doctors"));

const SafetyLayout = lazy(() => import("../pages/safety/layout"));
const Safety = lazy(() => import("../pages/safety/Safety").then(m => ({ default: m.Safety })));

const ApartmentsNewLayout = lazy(() => import("../pages/apartments-new/layout"));
const ApartmentsNew = lazy(() => import("../pages/apartments-new/ApartmentsNew").then(m => ({ default: m.ApartmentsNew })));

const OperationRoomsLayout = lazy(() => import("../pages/operation-rooms/layout"));
const OperationRooms = lazy(() => import("../pages/operation-rooms/OperationRooms").then(m => ({ default: m.OperationRooms })));

const ContactLayout = lazy(() => import("../pages/contact/layout"));
const Contact = lazy(() => import("../pages/contact/Contact").then(m => ({ default: m.Contact })));

const PrivacyPolicyLayout = lazy(() => import("../pages/privacy-policy/layout"));
const PrivacyPolicy = lazy(() => import("../pages/privacy-policy/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));

const GettingReadyLayout = lazy(() => import("../pages/getting-ready/layout"));
const GettingReady = lazy(() => import("../pages/getting-ready/GettingReady"));

const PricesLayout = lazy(() => import("../pages/prices/layout"));
const Prices = lazy(() => import("../pages/prices/Prices"));

const DocumentsLayout = lazy(() => import("../pages/documents/layout"));
const Documents = lazy(() => import("../pages/documents/Documents"));

const PatientLayout = lazy(() => import("../pages/patient/layout"));
const Patient = lazy(() => import("../pages/patient/Patient").then(m => ({ default: m.Patient })));

const PatientInfoLayout = lazy(() => import("../pages/patient-info/layout"));
const PatientInfo = lazy(() => import("../pages/patient-info/PatientInfo").then(m => ({ default: m.PatientInfo })));

const NewsLayout = lazy(() => import("../pages/news/layout"));
const News = lazy(() => import("../pages/news/News").then(m => ({ default: m.News })));

const AboutLayout = lazy(() => import("../pages/about/layout"));
const About = lazy(() => import("../pages/about/About").then(m => ({ default: m.About })));

const TourismLayout = lazy(() => import("../pages/tourism/layout"));
const Tourism = lazy(() => import("../pages/tourism/Tourism").then(m => ({ default: m.Tourism })));

const CookieLayout = lazy(() => import("../pages/cookie/layout"));
const Cookie = lazy(() => import("../pages/cookie/Cookie").then(m => ({ default: m.Cookie })));

const UserAgreementLayout = lazy(() => import("../pages/poljzovateljskoe-soglashenie-ob-ispoljzovanii-sajta/layout"));
const UserAgreement = lazy(() => import("../pages/poljzovateljskoe-soglashenie-ob-ispoljzovanii-sajta/UserAgreement").then(m => ({ default: m.UserAgreement })));

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
