import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";

type Props = { scrollRef: React.RefObject<HTMLElement> };

export const AboutServices = forwardRef<HTMLDivElement, Props>(({ scrollRef }, ref) => {
    const { scrollY } = useScroll({ target: scrollRef });
    const [vh, setVh] = useState(window.innerHeight);

    useEffect(() => {
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const input = [0, vh * 0.99, vh];
    const output = [vh, 0, 0];

    const aboutServicesY = useTransform(scrollY, input, output);

    return (
        <motion.section
            ref={ref}
            className="absolute top-0 left-0 w-full h-screen z-20"
            style={{ y: aboutServicesY }}
        >
            <img src="src/assets/bg-second-block.png" className="w-full h-screen object-cover" />
        </motion.section>
    );
})