import Clocks from "./Clocks";
import { useClocks } from "./ClocksProvider";

const MobileBackground = () => {
    const { minuteAngle, hourAngle } = useClocks();

    return (
        <div className="clock-block pointer-events-none md:hidden fixed aspect-square sm:w-[calc(30%*2)] w-[calc(50%*2)] left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 h-auto">
            <div className="bg-white aspect-square w-full h-full blur-[80px] rounded-full"></div>
            <Clocks
                minuteAngle={minuteAngle}
                hourAngle={hourAngle}
                className="mobile-clocks absolute h-[100%] w-[100%] sm:w-[130%] sm:h-[130%] left-1/2 top-1/2 -translate-y-4/6 sm:-translate-y-1/2 -translate-x-1/2"
            />
        </div>
    );
};

export default MobileBackground;
