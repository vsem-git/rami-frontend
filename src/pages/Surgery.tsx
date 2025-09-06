import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Surgery() {
    const { scrollY } = useScroll();
    const myElementRef = useRef(null);
  
    // Второй блок поднимается снизу вверх по мере скролла
    const surgeryY = useTransform(scrollY, [0, window.innerHeight], [window.innerHeight, 0]  );

    useEffect(() => {console.log(surgeryY); console.log(myElementRef); console.log(scrollY)}, [surgeryY, scrollY, myElementRef])
    return (
        <motion.section
        ref={myElementRef}
        className="absolute top-0 left-0 w-full h-screen z-20"
        style={{ y: surgeryY, /*position:  === 0 ? "sticky" : "absolute"*/ }}
      >
            <img src="src/assets/bg-second-block.png" className="w-full h-screen object-cover"/>
            </motion.section>
    );
}
