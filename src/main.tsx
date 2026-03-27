/* import { StrictMode } from "react"; */
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminProvider } from "./contexts/AdminContext";
import { AdminBar } from "./components/AdminBar";
import { ContentProvider } from "./contexts/ContentContext";

// import UnderConstruction from "./UnderConstruction";
//
// function isUnderConstruction() {
//     const envFlag = false;
//
//     const params = new URLSearchParams(location.search);
//     const ucParam = params.get("uc"); // on | off | null
//     const queryFlag = ucParam === "on" ? true : ucParam === "off" ? false : null;
//
//     // 3) Локальный обход заглушки (dev-кнопка)
//     const bypass = localStorage.getItem("uc_bypass") === "1";
//
//     // Приоритет: bypass > query > env
//     if (bypass) return false;
//     if (queryFlag !== null) return queryFlag;
//     return envFlag;
// }
//
// createRoot(document.getElementById("root")!).render(
//     isUnderConstruction() ? <UnderConstruction /> : <RouterProvider router={router} />
// );


createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <AdminProvider>
            <ContentProvider>
                <AdminBar />
                <Suspense fallback={null}>
                    <RouterProvider router={router} />
                </Suspense>
            </ContentProvider>
        </AdminProvider>
    </ErrorBoundary>
);