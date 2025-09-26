import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Тип состояния одного попапа
type PopupState = Record<string, boolean>;

type PopupContextType = {
    popups: PopupState;
    openPopup: (name: string) => void;
    closePopup: (name: string) => void;
    togglePopup: (name: string) => void;
    isOpen: (name: string) => boolean;
};

// Контекст с дефолтными заглушками
const PopupContext = createContext<PopupContextType>({
    popups: {},
    openPopup: () => {},
    closePopup: () => {},
    togglePopup: () => {},
    isOpen: () => false,
});

// Хук для удобного использования
export const usePopup = () => useContext(PopupContext);

// Провайдер
type PopupProviderProps = { children: ReactNode };

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
    const [popups, setPopups] = useState<PopupState>({});

    const openPopup = (name: string) => {
        setPopups((prev) => ({ ...prev, [name]: true }));
        console.log(popups);
    };

    const closePopup = (name: string) => {
        setPopups((prev) => ({ ...prev, [name]: false }));
    };

    const togglePopup = (name: string) => {
        setPopups((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const isOpen = (name: string) => !!popups[name];

    return (
        <PopupContext.Provider
            value={{ popups, openPopup, closePopup, togglePopup, isOpen }}
        >
            {children}
        </PopupContext.Provider>
    );
};
