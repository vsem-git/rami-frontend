import React, { createContext, useContext, useState } from "react";

const HeaderContext = createContext({
    headerColor: "#000000",
    setHeaderColor: (color: string) => {
        color;
    },
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [headerColor, setHeaderColor] = useState("#000000");

    return (
        <HeaderContext.Provider value={{ headerColor, setHeaderColor }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);
