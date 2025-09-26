import React, { createContext, useContext, useState } from "react";

const HeaderContext = createContext({
    headerColor: "#000000",
    setHeaderColor: (color: string) => {
        color;
    },
    navbarColor: "",
    setNavbarColor: (color: string) => {
        color;
    },
    isNavBarVisible: true,
    setIsNavBarVisible: (isVisible: boolean) => {
        isVisible;
    },
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [headerColor, setHeaderColor] = useState("#000000");
    const [navbarColor, setNavbarColor] = useState("");
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);

    return (
        <HeaderContext.Provider
            value={{
                headerColor,
                setHeaderColor,
                navbarColor,
                setNavbarColor,
                isNavBarVisible,
                setIsNavBarVisible,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);
