import { createContext, useContext, useState } from "react";

const ScrollContext = createContext({
    scrollToClinic: () => {},
    scrollToManifesto: () => {},
    setScrollToClinic: (fn) => {},
    setScrollToManifesto: (fn) => {},
});

export const ScrollProvider = ({ children }) => {
    const [scrollToClinic, setScrollToClinic] = useState(() => () => {});
    const [scrollToManifesto, setScrollToManifesto] = useState(() => () => {});

    const value = {
        scrollToClinic,
        scrollToManifesto,
        setScrollToClinic,
        setScrollToManifesto,
    };
    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext);
