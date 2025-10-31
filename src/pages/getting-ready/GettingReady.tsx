import AnimationBlock from "../../components/GettingReady/AnimationBlock";
import { useHeader } from "../../components/HeaderContext";
import { useEffect } from "react";

const GettingReady = () => {
    const { setHeaderColor } = useHeader();
    useEffect(() => {
        setHeaderColor("#ffffff");
    }, []);
    return (
        <>
            <AnimationBlock />
        </>
    );
};

export default GettingReady;
