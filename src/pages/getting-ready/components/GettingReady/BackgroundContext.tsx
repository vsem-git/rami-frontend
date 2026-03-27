import { createContext, useContext, useState } from "react";

const BackgroundContext = createContext<{
    currentState: number;
    setCurrentState: (value: number) => void;
}>({
    currentState: 0,
    setCurrentState: () => {},
});

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error(
            "useBackground must be used within a BackgroundProvider"
        );
    }
    return context;
};

export const BackgroundProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentState, setCurrentState] = useState<number>(0);

    return (
        <BackgroundContext.Provider value={{ currentState, setCurrentState }}>
            {children}
        </BackgroundContext.Provider>
    );
};
