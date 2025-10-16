import VideoAnimation from "../../components/VideoAnimation/VideoAnimation";
import SecondAnimationBlock from "../../components/SecondAnimationBlock/SecondAnimationBlock";
import ThirdAndSecondAnimation from "../../components/WrapperThirdAnimation/ThirdAndSecondAnimation";
import FourthAnimationBlock from "../../components/FourthAnimationBlock/FourthAnimationBlock";
import RebornFirstAnimationBlock from "../../components/RebornFirstAnimationBlock/RebornFirstAnimationBlock";
import {useEffect} from "react";


function toggleBypass() {
    const key = "uc_bypass";
    const on = localStorage.getItem(key) === "1";
    if (on) localStorage.removeItem(key);
    else localStorage.setItem(key, "1");
    location.reload();
}

const Home = () => {

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const ctrlOrCmd = e.ctrlKey || e.metaKey;
            if (ctrlOrCmd && e.altKey && e.key.toLowerCase() === "u") {
                e.preventDefault();
                toggleBypass();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <>
            <VideoAnimation />
            {/* <FirstAnimationBlock /> */}
            <RebornFirstAnimationBlock />
            <SecondAnimationBlock />
            <ThirdAndSecondAnimation />
            <FourthAnimationBlock />
        </>
    );
};

export default Home;
