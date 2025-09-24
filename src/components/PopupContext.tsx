import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Тип состояния попапа
type PopupContextType = {
    isOpen: boolean;
    openPopup: () => void;
    closePopup: () => void;
};

// Контекст с дефолтными заглушками
const PopupContext = createContext<PopupContextType>({
    isOpen: false,
    openPopup: () => {},
    closePopup: () => {},
});

// Хук для удобного использования
export const usePopup = () => useContext(PopupContext);

// Провайдер
type PopupProviderProps = { children: ReactNode };

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return (
        <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};
