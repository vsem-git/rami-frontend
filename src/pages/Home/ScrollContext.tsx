import { createContext, useContext, useState } from "react";

const ScrollContext = createContext({
    scrollToClinic: () => {},
    scrollToManifesto: () => {},
    scrollToServices: () => {},
    scrollToTeam: () => {},
    scrollToLocation: () => {},
    setScrollToClinic: (fn: () => void) => {
        fn();
    },
    setScrollToManifesto: (fn: () => void) => {
        fn();
    },
    setScrollToServices: (fn: () => void) => {
        fn();
    },
    setScrollToTeam: (fn: () => void) => {
        fn();
    },
    setScrollToLocation: (fn: () => void) => {
        fn();
    },
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [scrollToClinic, setScrollToClinic] = useState(() => () => {});
    const [scrollToManifesto, setScrollToManifesto] = useState(() => () => {});
    const [scrollToServices, setScrollToServices] = useState(() => () => {});
    const [scrollToTeam, setScrollToTeam] = useState(() => () => {});
    const [scrollToLocation, setScrollToLocation] = useState(() => () => {});

    const value = {
        scrollToClinic,
        scrollToManifesto,
        scrollToServices,
        scrollToTeam,
        scrollToLocation,
        setScrollToClinic,
        setScrollToManifesto,
        setScrollToServices,
        setScrollToTeam,
        setScrollToLocation,
    };
    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext);
