import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

type PopupState = Record<string, boolean>;

type PopupContextType = {
    popups: PopupState;
    openPopup: (name: string) => void;
    closePopup: (name: string) => void;
    closeAllPopups: () => void;
    togglePopup: (name: string) => void;
    isOpen: (name: string) => boolean;
};

const PopupContext = createContext<PopupContextType>({
    popups: {},
    openPopup: () => {},
    closePopup: () => {},
    closeAllPopups: () => {},
    togglePopup: () => {},
    isOpen: () => false,
});

export const usePopup = () => useContext(PopupContext);

type PopupProviderProps = { children: ReactNode };

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
    const [popups, setPopups] = useState<PopupState>({});

    const openPopup = useCallback((name: string) => {
        setPopups((prev) => ({ ...prev, [name]: true }));
    }, []);

    const closePopup = useCallback((name: string) => {
        setPopups((prev) => ({ ...prev, [name]: false }));
    }, []);

    const closeAllPopups = useCallback(() => {
        setPopups({});
    }, []);

    const togglePopup = useCallback((name: string) => {
        setPopups((prev) => ({ ...prev, [name]: !prev[name] }));
    }, []);

    const isOpen = useCallback((name: string) => !!popups[name], [popups]);

    const value = {
        popups,
        openPopup,
        closePopup,
        closeAllPopups,
        togglePopup,
        isOpen,
    };

    return (
        <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
    );
};
