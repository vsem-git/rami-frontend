import { useScroll } from "../pages/Home/ScrollContext";

const ScrollToButton = () => {
    const { scrollToClinic } = useScroll();

    return (
        <button
            onClick={() => scrollToClinic()}
            className="scrolltobutton invert relative bottom-[-2rem] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center text-white group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-t-full w-[250px] h-[120px] bg-[#00000017] flex flex-col items-center justify-start border-t border-white/20 transition-all duration-300  group-hover:scale-105">
                {/* <div className="text-[12px] tracking-widest uppercase mb-1  transition-all">
                                Листать вниз
                            </div> */}
                <img
                    src="/icon-r-big.svg"
                    alt="arrow-down"
                    className="w-8 h-8 rotate-90 transition-all mt-8"
                />
            </div>
        </button>
    );
};

export default ScrollToButton;
