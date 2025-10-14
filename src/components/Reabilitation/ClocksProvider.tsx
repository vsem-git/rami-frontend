import { createContext, useContext, useState } from "react";

const ClocksContext = createContext({
    minuteAngle: 0,
    hourAngle: 0,
    setMinuteAngle: (_angle: number) => {},
    setHourAngle: (_angle: number) => {},
});

const ClocksProvider = ({ children }: { children: React.ReactNode }) => {
    const [minuteAngle, changeMinuteAngle] = useState(0);
    const [hourAngle, changeHourAngle] = useState(0);

    const setMinuteAngle = (angle: number) => {
        changeMinuteAngle(angle);
    };

    const setHourAngle = (angle: number) => {
        changeHourAngle(angle);
    };

    return (
        <ClocksContext.Provider
            value={{ minuteAngle, hourAngle, setMinuteAngle, setHourAngle }}
        >
            {children}
        </ClocksContext.Provider>
    );
};

const useClocks = () => {
    return useContext(ClocksContext);
};

export { ClocksProvider, useClocks };
